from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from .models import Student

def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user :
            login(request, user)
            return redirect('home')
        else:
            if user is None:
                return render(request, 'portal/login.html', {'error': 'Invalid Credentials'})
    return render(request, 'portal/login.html')

@login_required
def home_view(request):
    students = Student.objects.filter(teacher=request.user)
    return render(request, 'portal/home.html', {'students': students})

@login_required
def add_student(request):
    if request.method == 'POST':
        name = request.POST.get('name', '').strip()
        subject = request.POST.get('subject', '').strip()
        marks = request.POST.get('marks')

        if not name or not subject or not marks:
            return JsonResponse({'success': False, 'error': 'All fields are required'})

        try:
            marks = int(marks)
        except ValueError:
            return JsonResponse({'success': False, 'error': 'Marks must be an integer'})

        student, created = Student.objects.get_or_create(
            teacher=request.user,
            name=name,
            subject=subject,
            defaults={'marks': marks}
        )
        if not created:
            student.marks += marks
            student.save()

        return JsonResponse({'success': True})

    return JsonResponse({'success': False, 'error': 'Invalid method'})


@login_required
def edit_student(request, pk):
    if request.method == 'POST':
        student = get_object_or_404(Student, pk=pk, teacher=request.user)
        student.name = request.POST['name']
        student.subject = request.POST['subject']
        student.marks = int(request.POST['marks'])
        student.save()
        return JsonResponse({'success': True})
    return JsonResponse({'success': False, 'error': 'Invalid method'})

@login_required
def delete_student(request, pk):
    if request.method == 'POST':
        student = get_object_or_404(Student, pk=pk, teacher=request.user)
        student.delete()
        return JsonResponse({'success': True})
    return JsonResponse({'success': False, 'error': 'Invalid method'})

@login_required
def logout_view(request):
    logout(request)
    return redirect('login')
