import datetime
import json
import os

from __builtin__ import file

from command.status import get_log
from endpoint.page_request.login_checker import LoginChecker


class LatestPrevLog:
    def GET(self):
        """
        Serves the second-latest logfile from interval control.

        Returns:
            A JSON object with the following variables::

                file (str): The contents of the logfile.
                timestamp (str): The timestamp that the logfile was last modified.

        Raises:
            web.notfound
        """
        if LoginChecker.loggedIn():
            path = "/data0/latest_prev/" + get_log("latest_prev")

            if os.path.exists(path):
                data = {}
                getFile = file(path, 'rb')
                data['file'] = getFile.read()
                filestate = os.stat(path)
                data['timestamp'] = datetime.datetime.fromtimestamp(filestate.st_mtime).strftime('%d-%m-%Y %H:%M:%S')
                outJSON = json.dumps(data)

                return outJSON
            else:
                raise web.notfound()