# CAMERA UTILITiES
import calendar
import re

import time
from backend import constants
from command import exec_console_command


def turn_camera_off():
    """
    Switches the DSLR camera off.

    Returns:
        feedbackOutput (str): Resulting feedback.

    Raises:
        IOError
    """
    # Do command
    consoleOutput = exec_console_command(constants.cameraOff + constants.getExitStatus)

    if "2" in consoleOutput:
        raise IOError(constants.cameraOffScriptNotFound)

    # Parse output
    feedbackOutput = constants.cameraSwitchedOff

    return feedbackOutput


def turn_camera_on():
    """
    Swithes the DSLR camera on.

    Returns:
        feedbackOutput (str): Resulting feedback.

    Raises:
        IOError
    """
    # Do command
    consoleOutput = exec_console_command(constants.cameraOn + constants.getExitStatus)

    if "2" in consoleOutput:
        raise IOError(constants.cameraOnScriptNotFound)

    # Parse output
    feedbackOutput = constants.cameraSwitchedOn

    return feedbackOutput


def camera_status():
    """
    Delivers a summary of the DSLR's status.

    Returns:
        feedbackOutput (str): Resulting feedback.
        status (bool): On / off state of the DSLR camera.
    """
    # Do command
    consoleOutput = exec_console_command(constants.cameraCheck)

    # Parse output for results
    status = False
    feedbackOutput = constants.cameraCheckOff

    if "Nikon Corp." in consoleOutput:
        status = True
        feedbackOutput = constants.cameraCheckOn

    # Encode to JSON
    return feedbackOutput, status


def download_picture(inPath):
    """
    Fetches the specified .NEF file for the user to download.

    Args:
        inPath (str): The filepath of the file to download.

    Returns:
        success (bool): Represents the success of the request.

    Raises:
        IOError
    """
    success = False
    consoleFeedback = exec_console_command(constants.copyFileToStatic.format(inPath))
    print(consoleFeedback)

    if "SUCCESS" in consoleFeedback:
        success = True
    else:
        raise IOError(constants.pictureNotFound)

    return success


def download_thumbnail(inPath):
    """
    Extracts the thumbnail of the specified .NEF, and serves it to the user.

    Args:
        inPath (str): Filepath of the .NEF file to extract the thumbnail from.

    Returns:
        success (bool): Represents the success of the operation.

    Raises:
        IOError
    """
    success = False
    consoleFeedback = exec_console_command(constants.extractThumbnail.format(inPath))

    if "SUCCESS" in consoleFeedback:
        success = True
    else:
        raise IOError(constants.pictureNotFound)

    return success


def find_pictures(inDate):
    """
    Fetches the filenames of pictures taken on the date specified.

    Args:
        inDate (date): The date the requested pictures were taken.

    Returns:
        dict. Picture file creation times and paths, the format::

            {filecreationtime : filepath}
    """
    data = {}
    # Let's do some directory searching!
    day = inDate.day.zfill(2)
    month = inDate.month.zfill(2)
    year = inDate.year
    commandTemplate = constants.findPictures
    command = commandTemplate.format(year, month, day)
    foundDirectories = exec_console_command(command)
    directoriesList = foundDirectories.split('\n')

    if directoriesList:
        # Find all dates + times for all directories
        data = {}

        for directory in directoriesList:
            fileList = exec_console_command("ls " + directory).split("\n")

            for fileName in fileList:
                if ".NEF" in fileName:
                    # Get filepath for NEF file
                    filePath = (directory + "/" + fileName)
                    # Find timestamp of when photo was taken
                    regexSearch = re.search('(?<!\d)\d{6}(?!\d)', filePath)
                    fileCreationTime = ""

                    if regexSearch:
                        fileCreationTime = regexSearch.group(0)
                        fileCreationTime = fileCreationTime[:2] + ':' + fileCreationTime[2:]
                        fileCreationTime = fileCreationTime[:5] + ':' + fileCreationTime[5:]
                        h, m, s = fileCreationTime.split(':')
                        seconds = int(h) * 3600 + int(m) * 60 + int(s)
                        offset = calendar.timegm(time.localtime()) - calendar.timegm(
                            time.gmtime(time.mktime(time.localtime())))
                        fileCreationTimeSeconds = seconds + offset
                        fileCreationTimeReadable = time.strftime('%H:%M:%S', time.gmtime(fileCreationTimeSeconds))

                    data[fileCreationTimeReadable] = filePath

        return data


def remove_thumbnail(inJSON):
    """
    Deletes the specified thumbnail from the camera's filesystem.

    Args:
        inJSON (json): A JSON object with the following format::

            {filepath : (filepath)}

    Returns:
        success (bool): Represents the success of the operation.

    Raises:
        IOError
    """
    time.sleep(2)
    consoleOutput = exec_console_command("rm " + inJSON + ";" + constants.getExitStatus)

    if "\n1" in consoleOutput:
        raise IOError("Thumbnail file doesn't exist to delete. No worries though, it was going to be deleted anyway!")

    return 0


def turn_video_camera_off():
    """
    Switches the video camera off.

    Returns:
        feedbackOutput (str): Resulting feedback.

    Raises:
        IOError

    Doesn't return a boolean yet, because a way to detect the video camera's presence is
    still to be implemented.
    """
    # Do command
    consoleFeedback = exec_console_command(constants.videoCameraOff + constants.getExitStatus)

    # Parse output
    if "2" in consoleFeedback:
        raise IOError(constants.cameraOffScriptNotFound)

    feedbackOutput = constants.videoCameraSwitchedOff

    return feedbackOutput


def turn_video_camera_on():
    """
    Switches the video camera on.

    Returns:
        feedbackOutput (str): Resulting feedback.

    Raises:
        IOError

    Doesn't return a boolean yet, because a way to detect the video camera's presence is
    still to be implemented.
    """
    # Do command
    consoleFeedback = exec_console_command(constants.videoCameraOn + constants.getExitStatus)

    # Parse output
    if "2" in consoleFeedback:
        raise IOError(constants.videoCameraOnScriptNotFound)

    feedbackOutput = constants.videoCameraSwitchedOn

    return feedbackOutput
