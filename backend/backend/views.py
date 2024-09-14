import random

from urllib.parse import quote, unquote

from django.core.handlers.wsgi import WSGIRequest
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

import wikipediaapi


@api_view(['GET'])
def get_wiki_page(request: WSGIRequest):
    latest_search: str = unquote(request.COOKIES.get('latest_search', None))
    is_random: bool = request.COOKIES.get('random', False) == "true"
    if not latest_search:
        return Response(status=status.HTTP_404_NOT_FOUND)

    wiki = wikipediaapi.Wikipedia('University Project (maxim.leushkin@mail.ru)', 'ru')
    wiki_page = wiki.page(latest_search)
    if wiki_page.exists():

        summary = wiki_page.summary
        if is_random:
            words = summary.split()
            random.shuffle(words)
            summary = ' '.join(words)

        data = {
            "title": wiki_page.title,
            "summary": summary,
            "url": wiki_page.fullurl,
        }
        response = Response(data=data, status=status.HTTP_200_OK)

    else:
        response = Response(status=status.HTTP_404_NOT_FOUND)

    return response
