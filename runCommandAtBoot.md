设置脚本开机自启动,centos系统

	/etc/rc.d/init.d/mongonode
	ln -s /etc/rc.d/init.d/mongonode /etc/rc.d/rc2.d/S99mongonode
	ln -s /etc/rc.d/init.d/mongonode /etc/rc.d/rc3.d/S99mongonode
	ln -s /etc/rc.d/init.d/mongonode /etc/rc.d/rc5.d/S99mongonode
	ln -s /etc/rc.d/init.d/mongonode /etc/rc.d/rc0.d/K01mongonode
	ln -s /etc/rc.d/init.d/mongonode /etc/rc.d/rc6.d/K01mongonode

设置定时启动后台程序：

	crontab -e
	crontab -l

	*/5 * * * * /opt/shadowsocks-1.3.3/check.sh
	*/5 * * * * /usr/share/NodeJS/Node.js/mongod-node.start