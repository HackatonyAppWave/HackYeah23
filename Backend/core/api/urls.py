from django.urls import path
from .views import *


urlpatterns = [
    path("", hello_world),
    path("login", login),
    path("zloty-strzal", gold_shot),
    path("profesor-gpt", ChatListView.as_view()),
    path("get-messages", ChatMessageListView.as_view()),
    path('questions/', QuestionListView.as_view()),
    path('survey/create/', SurveyCreateView.as_view()),
]
