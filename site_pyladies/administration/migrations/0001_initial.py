# Generated by Django 2.0.8 on 2018-09-23 16:35

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Settings',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('site_name', models.CharField(max_length=200)),
                ('site_logo', models.CharField(max_length=200)),
                ('app_id_facebook', models.CharField(max_length=200)),
                ('app_id_meetup', models.CharField(max_length=200)),
                ('id_meetup', models.CharField(max_length=200)),
            ],
        ),
    ]