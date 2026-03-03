#!/usr/bin/env bash
# exit on error
set -o errexit

pip install -r requirements.txt

cd backend
python manage.py collectstatic --no-input
python manage.py migrate

# Create superuser if it doesn't exist (using environment variables on Render)
if [ "$DJANGO_SUPERUSER_USERNAME" ]; then
  python manage.py createsuperuser \
    --no-input \
    --username $DJANGO_SUPERUSER_USERNAME \
    --email $DJANGO_SUPERUSER_EMAIL \
    || true
fi
