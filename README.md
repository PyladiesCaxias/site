# site
New site


### Preparando o ambiente

#### Virtualenv

python3 -m venv myvenv
myvenv\Scripts\activate


(myvenv) ~$ python3 -m pip install --upgrade pip
(myvenv) ~$ python3 -m pip install -r requirements.txt


### Criando o Banco de Dados

$ python3 manage.py migrate


### Rodando o servidor

$ python3 manage.py runserver
