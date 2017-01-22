# VLC Remote Control

A simple app that reads data from a serial port and parse them into URL commands for the VLC HTTP server.

In order to use it, you would first have to enable VLC's [web interface](https://wiki.videolan.org/documentation:modules/http_intf/) and set password. Password is mandatory.

## Usage

To run the app first install dependencies:
```sh
$ npm install
```

then
```shell
$ npm start -- -p <vlcPassword> -s <serialPort> -v <vlcPort> -b <baudRate>
```

For more info:
```shell
$ npm start -- -h
```

At the moment, app maps the following inputs to VLC actions:
* 1 => play
* 2 => stop
* 3 => pause

In case you don't have a device to write to a serial port, you can use [socat](https://www.cyberciti.biz/faq/linux-unix-tcp-port-forwarding/) for testing purposes.

```shell
$ socat -d -d pty,raw,echo=0 pty,raw,echo=0
2017/01/22 12:35:55 socat[400] N PTY is /dev/pts/2
2017/01/22 12:35:55 socat[400] N PTY is /dev/pts/4
2017/01/22 12:35:55 socat[400] N starting data transfer loop with FDs [5,5] and
```

then just, depending on the output, start app with
```shell
$ npm start -- -s /dev/pts/4 -p <vlcPassword>
```

and from other terminal
```shell
$ echo "3" > /dev/pts/2
```
