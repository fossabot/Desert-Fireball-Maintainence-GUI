import os
import subprocess
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


def exec_console_command(command):
    """
    Sends the system a console command to execute in bash.

    Args:
        command (str): A console command.

    Returns:
        outputText (str): The console output.
    """
    outputText = subprocess.check_output(command)[1]

    return outputText