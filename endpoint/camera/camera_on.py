import json
import web

from command.camera import camera_on, camera_status
from endpoint.login_checker import LoginChecker


class CameraOn:
    def GET(self):
        """
        Switches the DSLR camera on.

        Returns:
            outJSON (json): A JSON object containing the consoleFeedback and cameraStatus with the format::

                consoleFeedback (str): Resulting feedback.
                cameraStats (bool): Represents whether the DSLR camera is turned on or off.

        Raises:
            web.InternalError
        """
        if LoginChecker.loggedIn():
            data = {}

            try:
                data['consoleFeedback'] = camera_on()
                statusFeedback, statusBoolean = camera_status()
                data['consoleFeedback'] += statusFeedback
                data['cameraStatus'] = statusBoolean
                outJSON = json.dumps(data)
            except IOError as e:
                raise web.InternalError(e.message)

            return outJSON