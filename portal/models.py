from django.contrib.auth.models import User
from django.db import models

class Student(models.Model):
    teacher = models.ForeignKey(User, on_delete=models.CASCADE)  # To link students to logged in teacher
    name = models.CharField(max_length=100)
    subject = models.CharField(max_length=100)
    marks = models.IntegerField()

    class Meta:
        unique_together = ('teacher', 'name', 'subject')  # Ensures unique student+subject per teacher

    def __str__(self):
        return f'{self.name} - {self.subject}'