from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.error import URLError
from urllib.request import urlopen


class Handler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path != "/docs/openapi.json":
            return super().do_GET()
        try:
            with urlopen("http://localhost:8080/docs/openapi.json", timeout=5) as response:
                document = response.read()
        except URLError:
            return self.send_error(502, "Start the platform server for generated API docs")
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(document)))
        self.end_headers()
        self.wfile.write(document)


ThreadingHTTPServer(("127.0.0.1", 4400), Handler).serve_forever()
