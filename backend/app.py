from flask import Flask
import json
from flask_cors import CORS
import subprocess as sp

app = Flask(__name__)
CORS(app)


@app.route("/fetch")
def fetch():
    try:
        sp.run(['rm', 'files_changed.txt'])
    except:
        pass
    
    sp.run(['touch', 'files_changed.txt'])
    sp.getoutput("git -C ./source-repo/docker-swarm fetch && git -C ./source-repo/docker-swarm diff --name-only @ @{u} | tee -a files_changed.txt")
    sp.getoutput("git -C ./source-repo/docker-swarm pull")

    n = int(sp.getoutput("wc -l files_changed.txt | awk '{print $1}'"))
    
    if n == 0:
        status = 'sync'
    else:
        status = 'out of sync'
        f = open('files_changed.txt', 'r')
        for d in f:
            print(d)
            sp.getoutput(f"kubectl --kubeconfig config apply -f source-repo/docker-swarm/{d}")

        f.close()

    return json.dumps(status)

@app.route("/pods")
def pods():
    
    try:
        sp.run(['rm', 'pods.json'])
    except:
        pass
    
    sp.run(['touch', 'pods.json'])
    sp.getoutput("kubectl --kubeconfig config get pods --namespace dashboard -o json  | tee -a pods.json")

    with open('pods.json', 'r') as f:
        data = json.loads(f.read())

    res = []
    for i, p in enumerate(data['items']):
        res.append({'id': i, 'name': p['metadata']['name'],
        'status': list(p['status']['containerStatuses'][0]['state'].keys())[0]})

    return json.dumps(res)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)
