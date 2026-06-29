from flask import Flask, jsonify, request, abort
import psutil
import os

app = Flask(__name__)

SECRET = "s1YF35yWpalQtS2h6p3PlmBip4YBaA3SIF"

def auth():
    if request.headers.get("X-Auth") != SECRET:
        abort(403)

# 🌡️ Temperature endpoint (for widget)
@app.route("/api/temperature")
def temperature():
    auth()

    temps = psutil.sensors_temperatures()
    cpu_temp = None

    for key in ("coretemp", "k10temp", "cpu-thermal"):
        if key in temps:
            cpu_temp = temps[key][0].current
            break

    return jsonify({
        "temp": cpu_temp
    })


# 🔁 Restart endpoint (button)
@app.route("/api/restart", methods=["POST"])
def restart():
    auth()
    os.system("sudo /sbin/shutdown -r now")
    return jsonify({"status": "restarting"})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8787)
