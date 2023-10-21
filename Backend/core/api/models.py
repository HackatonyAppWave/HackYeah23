from django.db import models

# Create your models here.

class Student(models.Model):
    email = models.EmailField(unique=True)

    def __str__(self) -> str:
        return self.email

class Question(models.Model):
    content = models.CharField(max_length=120)
    order = models.IntegerField()

    def __str__(self) -> str:
        return self.content


class Survey(models.Model):
    user = models.OneToOneField(Student, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.user.email + " - survey"
    

class Answer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    content = models.CharField(max_length=300)
    survey = models.ForeignKey(Survey, on_delete=models.CASCADE)


    def __str__(self) -> str:
        return self.question.content + " " + self.content



class Chat(models.Model):
    user = models.ForeignKey(Student, on_delete=models.DO_NOTHING, blank=True)
    created = models.DateTimeField(auto_now_add=True, null=True)

    @property
    def title(self):
        return self.chatmessage_set.first()

    def __str__(self) -> str:
        return f"{self.user.email} | {self.title}"

class ChatMessage(models.Model):
    users_message = models.CharField(max_length=500)
    response = models.TextField()
    created = models.DateTimeField(auto_now_add=True, null=True)
    chat = models.ForeignKey(Chat, on_delete=models.DO_NOTHING, blank=True, null=True)

    def __str__(self) -> str:
        return f"{self.users_message} | {self.response}"
    