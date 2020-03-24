import soco

from flask import Blueprint, jsonify
from soco import SoCo

zones_blueprint = Blueprint('zones', __name__)


@zones_blueprint.route('/zones')
def get_zones():
    zones = []

    for zone in soco.discover():
        info = zone.get_current_transport_info()
        is_playing = _is_playing(info)

        zones.append({
            'player_name': zone.player_name,
            'ip_address': zone.ip_address,
            'is_playing': is_playing,
        })

    return jsonify(zones)


@zones_blueprint.route('/zones/<ip_address>/play', methods=['PUT'])
def play(ip_address):
    zone = SoCo(ip_address)
    zone.play()

    return '', 200


@zones_blueprint.route('/zones/<ip_address>/pause', methods=['PUT'])
def pause(ip_address):
    zone = SoCo(ip_address)
    zone.pause()

    return '', 200


@zones_blueprint.route('/zones/<ip_address>/previous', methods=['PUT'])
def play_previous(ip_address):
    zone = SoCo(ip_address)
    zone.previous()

    track = _get_current_track(zone)
    return jsonify(track)


@zones_blueprint.route('/zones/<ip_address>/next', methods=['PUT'])
def play_next(ip_address):
    zone = SoCo(ip_address)
    zone.next()

    track = _get_current_track(zone)
    return jsonify(track)


@zones_blueprint.route('/zones/<ip_address>/current-track')
def get_current_track(ip_address):
    zone = SoCo(ip_address)
    track = _get_current_track(zone)
    return jsonify(track)


def _get_current_track(zone):
    track = zone.get_current_track_info()

    return {
        'album': track.get('album'),
        'album_art': track.get('album_art'),
        'artist': track.get('artist'),
        'title': track.get('title'),
        'duration': _harmonize_track_info(track.get('duration')),
        'position': _harmonize_track_info(track.get('position')),
    }


def _harmonize_track_info(value):
    if value == 'NOT_IMPLEMENTED':
        return ''

    return value

def _is_playing(info):
    return info and info.get('current_transport_state') == 'PLAYING'
