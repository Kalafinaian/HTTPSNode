yum -y install php + 如下配置：

server {
	server_name  localhost;
	listen 443 ssl;
	ssl on;
	ssl_certificate  /etc/nginx/server.crt;
	ssl_certificate_key  /etc/nginx/server.key;

	#charset koi8-r;
	access_log  /var/log/nginx/access.log  main;
	error_log /var/log/nginx/error.log;

	location / {
		root   /usr/share/nginx/MBS_WebSourceCode;
		index index.php index.html index.htm;
		add_header  Access-Control-Allow-Origin  *;
	}

	location /v1 {
		index index.php index.html index.htm;
		add_header  Access-Control-Allow-Origin  *;
		proxy_pass https://localhost:8070/v1;
#Proxy Settings
		proxy_redirect     off;
		proxy_set_header   Host             $host;
		proxy_set_header   X-Real-IP        $remote_addr;
		proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
		proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504;
		proxy_max_temp_file_size 0;
		proxy_connect_timeout      90;
		proxy_send_timeout         90;
		proxy_read_timeout         90;
		proxy_buffer_size          4k;
		proxy_buffers              4 32k;
		proxy_busy_buffers_size    64k;
		proxy_temp_file_write_size 64k;
	}

	location /v0 {
		index index.php index.html index.htm;
		add_header  Access-Control-Allow-Origin  *;
		proxy_pass https://localhost:8000/v0;
#Proxy Settings
		proxy_redirect     off;
		proxy_set_header   Host             $host;
		proxy_set_header   X-Real-IP        $remote_addr;
		proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
		proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504;
		proxy_max_temp_file_size 0;
		proxy_connect_timeout      90;
		proxy_send_timeout         90;
		proxy_read_timeout         90;
		proxy_buffer_size          4k;
		proxy_buffers              4 32k;
		proxy_busy_buffers_size    64k;
		proxy_temp_file_write_size 64k;
	}

	location /uploadStationFile {
		index index.php index.html index.htm;
                add_header  Access-Control-Allow-Origin  *;
		proxy_pass https://localhost:8080/uploadStationFile;
#Proxy Settings
		proxy_redirect     off;
		proxy_set_header   Host             $host;
		proxy_set_header   X-Real-IP        $remote_addr;
		proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
		proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504;
		proxy_max_temp_file_size 0;
		proxy_connect_timeout      90;
		proxy_send_timeout         90;
		proxy_read_timeout         90;
		proxy_buffer_size          4k;
		proxy_buffers              4 32k;
		proxy_busy_buffers_size    64k;
		proxy_temp_file_write_size 64k;
	}

    location /uploadKeyFile {
                index index.php index.html index.htm;
		add_header  Access-Control-Allow-Origin  *;
                proxy_pass https://localhost:8080/uploadKeyFile;
#Proxy Settings
                proxy_redirect     off;
                proxy_set_header   Host             $host;
                proxy_set_header   X-Real-IP        $remote_addr;
                proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
                proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504;
                proxy_max_temp_file_size 0;
                proxy_connect_timeout      90;
                proxy_send_timeout         90;
                proxy_read_timeout         90;
                proxy_buffer_size          4k;
                proxy_buffers              4 32k;
                proxy_busy_buffers_size    64k;
                proxy_temp_file_write_size 64k;
        }


	location /uploadStationFileNew {
		index index.php index.html index.htm;
                add_header  Access-Control-Allow-Origin  *;
		proxy_pass https://localhost:8060/uploadStationFileNew;
#Proxy Settings
		proxy_redirect     off;
		proxy_set_header   Host             $host;
		proxy_set_header   X-Real-IP        $remote_addr;
		proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
		proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504;
		proxy_max_temp_file_size 0;
		proxy_connect_timeout      90;
		proxy_send_timeout         90;
		proxy_read_timeout         90;
		proxy_buffer_size          4k;
		proxy_buffers              4 32k;
		proxy_busy_buffers_size    64k;
		proxy_temp_file_write_size 64k;
	}

    location /uploadKeyFileNew {
                index index.php index.html index.htm;
                add_header  Access-Control-Allow-Origin  *;
		proxy_pass https://localhost:8060/uploadKeyFileNew;
#Proxy Settings
                proxy_redirect     off;
                proxy_set_header   Host             $host;
                proxy_set_header   X-Real-IP        $remote_addr;
                proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
                proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504;
                proxy_max_temp_file_size 0;
                proxy_connect_timeout      90;
                proxy_send_timeout         90;
                proxy_read_timeout         90;
                proxy_buffer_size          4k;
                proxy_buffers              4 32k;
                proxy_busy_buffers_size    64k;
                proxy_temp_file_write_size 64k;
        }

    location /chenganglist {
                index index.php index.html index.htm;
                add_header  Access-Control-Allow-Origin  *;
		proxy_pass https://github.com/chenganglist;
#Proxy Settings
                proxy_redirect     off;
                proxy_set_header   Host             $host;
                proxy_set_header   X-Real-IP        $remote_addr;
                proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
                proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504;
                proxy_max_temp_file_size 0;
                proxy_connect_timeout      90;
                proxy_send_timeout         90;
                proxy_read_timeout         90;
                proxy_buffer_size          4k;
                proxy_buffers              4 32k;
                proxy_busy_buffers_size    64k;
                proxy_temp_file_write_size 64k;
        }


	error_page  404              /404.html;

# redirect server error pages to the static page /50x.html
#
	error_page   500 502 503 504  /50x.html;
	location = /50x.html {
		root   /usr/share/nginx/MBS_WebSourceCode;
	}

# proxy the PHP scripts to Apache listening on 127.0.0.1:80
#
#location ~ .php$ {
#    proxy_pass   http://127.0.0.1;
#}

# pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000


	location ~ .php$ {
		root   /usr/share/nginx/MBS_WebSourceCode;
		try_files $uri = 404;
		fastcgi_pass   127.0.0.1:9000;
		fastcgi_index  index.php;
		fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
		include        fastcgi_params;
	}

# deny access to .htaccess files, if Apache's document root
# concurs with nginx's one
#
	location ~ /.ht {
		deny  all;
	}
}
