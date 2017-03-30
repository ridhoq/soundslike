from flask import Blueprint
from config import config
import os

site = Blueprint('site', __name__, static_folder="../../ui-dist")

from . import songs

