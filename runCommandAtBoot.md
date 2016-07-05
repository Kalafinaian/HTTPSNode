设置脚本开机自启动,centos系统

	/etc/rc.d/init.d/mongonode
	ln -s /etc/rc.d/init.d/mongonode /etc/rc.d/rc2.d/S99mongonode
	ln -s /etc/rc.d/init.d/mongonode /etc/rc.d/rc3.d/S99mongonode
	ln -s /etc/rc.d/init.d/mongonode /etc/rc.d/rc5.d/S99mongonode
	ln -s /etc/rc.d/init.d/mongonode /etc/rc.d/rc0.d/K01mongonode
	ln -s /etc/rc.d/init.d/mongonode /etc/rc.d/rc6.d/K01mongonode