# -*- coding=utf-8 -*-

__authors__ = [
    '"zhaobo" <zhaobo06@meituan.com>',
]

# from django.http import HttpResponse
from django.shortcuts import render


def hello(request):

    context = {}
    context['hello'] = '你好吗'
    return render(request, 'hello.html', context)

    # return HttpResponse("Hello World!")


def index(request):

    return render(request, 'index.html')
