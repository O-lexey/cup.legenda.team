import 'dart:async';
import 'dart:io';
import 'dart:convert';

Future main() async {

  var server = await HttpServer.bind(
    InternetAddress.ANY_IP_V4,
    1309,
  );
  print("Listening on localhost:${server.port}");
  await for (HttpRequest req in server) {

    final HttpResponse resp = req.response;

    final String last_name = HtmlEscape().convert(req.uri.queryParameters['last']);
    final String first_name = HtmlEscape().convert(req.uri.queryParameters['first']);
    final String year = HtmlEscape().convert(req.uri.queryParameters['year']);
    final String team = HtmlEscape().convert(req.uri.queryParameters['team']);
    final String si = HtmlEscape().convert(req.uri.queryParameters['si']);
    final String course = HtmlEscape().convert(req.uri.queryParameters['course'].substring(0,3));

    final String r = """
            <tr>
              <td>$last_name</td>
              <td>$first_name</td>
              <td>$year</td>
              <td>$team</td>
              <td>$si</td>
              <td>$course</td>
              <td></td>
            </tr>
        """;
      resp
      ..write(r)
      ..close();
  }
}