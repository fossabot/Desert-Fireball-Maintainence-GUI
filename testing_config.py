import json
from unittest import TestCase
from backend import flaskapp, db


class BaseTestConfig(TestCase):
    default_user = {
        "email":    "default@gmail.com",
        "password": "something2"
    }

    def create_app(self):
        flaskapp.config.from_object('config.TestingConfig')

        return flaskapp

    def setUp(self):
        self.app = self.create_app().test_client()
        db.create_all()

        res = self.app.post(
            "/api/create_user",
            data = json.dumps(self.default_user),
            content_type = 'application/json'
        )

        self.token = json.loads(res.data.decode("utf-8"))["token"]

    def tearDown(self):
        db.session.remove()
        db.drop_all()
