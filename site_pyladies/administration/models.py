from django.db import models


class Settings(models.Model):
    title = models.CharField(max_length=200)
    site_name = models.CharField(max_length=200)
    site_logo = models.CharField(max_length=200)
    app_id_facebook = models.CharField(max_length=200)
    app_id_meetup = models.CharField(max_length=200)
    id_meetup = models.CharField(max_length=200)
