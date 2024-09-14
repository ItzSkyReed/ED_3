# Используем официальный образ Python в качестве базового образа
FROM python

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1
# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app/backend
# Копируем файл requirements.txt внутрь контейнера
COPY requirements.txt /app/backend/
# Устанавливаем зависимости, описанные в файле requirements.txt
RUN pip install -r requirements.txt

COPY . /app/backend/

CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]