from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status, generics
from .models import *
from .permissions import IsAuthenticated
from .serializers import *
from ProfessorGPT import ProfessorGPT


professor = ProfessorGPT()

@api_view(["GET"])
def hello_world(request):
    return Response({"message": "Hello, world!"})

@api_view(["POST"])
def login(request):
    email = request.data.get("email", None)
    if email is None:
        return Response({"message": "Email wasn't provided"})
    
    if Student.objects.filter(email=email).exists():
        return Response({"message": "Success!", "created": False})

    serializer = StudentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Success!", "created": True})
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@permission_classes([IsAuthenticated])
@api_view(["POST"])
def gold_shot(request):
    email = request.POST.get("email")
    survey = Survey.objects.filter(user__email=email).first()
    if not survey:
        return Response("Musisz wypełnić ankietę aby zobaczyć tę stronę", status=status.HTTP_400_BAD_REQUEST)
    
    qna = []
    answers = survey.answer_set.all()
    for answer in answers:
        qna.append((answer.question.content, answer.content))


    response, linked_majors, linked_job_offers = professor.gold_shot()
    return Response({"message": response, "linked_majors": linked_majors, "linked_job_offers": linked_job_offers})


class ChatListView(generics.ListCreateAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = [IsAuthenticated]


    def get_queryset(self, *args, **kwargs):
        student = Student.objects.get(email=self.request.GET.get("email"))
        print(student)
        return self.queryset.filter(user=student).all()

    def get(self, request, *args, **kwargs):
        student = Student.objects.get(email=request.GET.get("email"))
        latest_chat = Chat.objects.filter(user=student).order_by('-created').first()

        if latest_chat is None or latest_chat.chatmessage_set.count() != 0:
            new_chat = Chat.objects.create(user=student)
            return self.list(request, *args, **kwargs)
        else:
            return self.list(request, *args, **kwargs)
            

    def post(self, request, *args, **kwargs):
        chat_id = request.data.get('chat_id')
        users_message = request.data.get('users_message')

        try:
            chat = Chat.objects.get(pk=chat_id)
        except Chat.DoesNotExist:
            return Response(
                {'message': 'Chat not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        # here is professor gpt running
        response, linked_majors, linked_job_offers = professor.generate_on_interests(users_message)

        response = "Hello, how can I help you?"
        mutable_data = request.data.copy()
        mutable_data['response'] = response

        serializer = ChatMessageSerializer(data=mutable_data)

        if serializer.is_valid():
            serializer.save(chat=chat)
            return Response({**serializer.data, "linked_majors": linked_majors, "linked_job_offers": linked_job_offers}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class ChatMessageListView(generics.ListAPIView):
    serializer_class = ChatMessageSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        chat_id = self.request.query_params.get('chat_id')
        if chat_id is not None:
            return ChatMessage.objects.filter(chat_id=chat_id)
        else:
            return ChatMessage.objects.none()


class QuestionListView(generics.ListAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [IsAuthenticated]


class SurveyCreateView(generics.CreateAPIView):
    serializer_class = SurveySerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        student = Student.objects.get(email=email)
        student_id = student.id
        answers_data = request.data.get('answers', [])

        mutable_data = request.data.copy()
        mutable_data['user'] = student_id

        for obj in Question.objects.all():
            print(obj.pk, obj.content)


        if hasattr(student, "survey"):
            return Response({"message": "the survey already exists"})
        
        survey_serializer = self.get_serializer(data=mutable_data)
        if survey_serializer.is_valid():
            survey = survey_serializer.save()
            for answer_data in answers_data:
                answer_data["survey"] = survey.pk
                answer_serializer = AnswerSerializer(data=answer_data)
                if answer_serializer.is_valid():
                    answer = answer_serializer.save()
                else:
                    survey.delete()
                    return Response(answer_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            return Response(survey_serializer.data, status=status.HTTP_201_CREATED)
        return Response(survey_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
