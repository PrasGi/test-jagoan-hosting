## Fitur

Untuk fitur bisa dilihat pada file pdf dengan nama fitur.pdf di dalam project, disana dijelaskan singkat mengenai fitur apa saja yang ada pada project.

## Installation

berikut adalah langkah langkah cara penginstallan, atau bisa juga menonton vidio yang sudah saya buat, di sana juga ada penjelasan tentang fitur apa saja yang ada pada project ini.

link vidio: [https://drive.google.com/file/d/1zeAH9GGqsxfLiqW8zGLmmP55ZhSWI3et/view?usp=sharing]

1. setelah mendownload project langkah pertama adalah membuka folder backend ke dalam code editor, kemudian ubah nama file .env.example menjadi .env

2. buka terminal lalu ketik

```
composer install
```

3. kemudian pada file .env tambahakan port :8000 pada key "APP_URL" contoh "APP_URL=http://localhost:8000"

4. ubah value pada key "FILESYSTEM_DISK" yang awalnya "local" menjadi "public"

5. kemudian buat database baru di database, untuk nama bebas

6. lalu ubah value pada key "DB_DATABASE" di file .env dengan value [nama database yagn dibuat sebelumnya]

7. pada terminal ketik code dibawah ini satu per satu

```
php artisan key:generate
```

```
php artisan storage:link
```

```
php artisan migrate:fresh --seed
```

8. lalu untuk menjalankan server ketik pada terminal, untuk port harus di :8000

```
php artisan serve
```

9. buka folder frontend menggunakan terminal atau terminal di code editor juga bisa lalu ketik

```
npm install
```

10. lalu untuk menjalankan server bisa ketik di terminal

```
npm run dev
```

11. kemudia klik url yang muncul itu akan mengarahkan ke halaman awal project (login page)

untuk login bisa menggunakan account ini:

```
email: rt@gmail.com
password: password
```
