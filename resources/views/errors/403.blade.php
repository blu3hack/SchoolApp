<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>403 - Akses Ditolak</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }
        
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        
        @keyframes wiggle {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(-5deg); }
            75% { transform: rotate(5deg); }
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        
        @keyframes rainbow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        body {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%);
            background-size: 400% 400%;
            animation: rainbow 15s ease infinite;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            font-family: 'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', cursive, sans-serif;
            position: relative;
            overflow: hidden;
        }
        
        /* Dekorasi Background */
        .cloud {
            position: absolute;
            background: white;
            border-radius: 100px;
            opacity: 0.3;
        }
        
        .cloud::before,
        .cloud::after {
            content: '';
            position: absolute;
            background: white;
            border-radius: 100px;
        }
        
        .cloud-1 {
            width: 100px;
            height: 40px;
            top: 10%;
            left: 10%;
            animation: float 6s ease-in-out infinite;
        }
        
        .cloud-1::before {
            width: 50px;
            height: 50px;
            top: -25px;
            left: 10px;
        }
        
        .cloud-1::after {
            width: 60px;
            height: 40px;
            top: -15px;
            right: 10px;
        }
        
        .cloud-2 {
            width: 120px;
            height: 45px;
            top: 70%;
            right: 10%;
            animation: float 7s ease-in-out infinite;
            animation-delay: 1s;
        }
        
        .cloud-2::before {
            width: 55px;
            height: 55px;
            top: -30px;
            left: 15px;
        }
        
        .cloud-2::after {
            width: 65px;
            height: 45px;
            top: -20px;
            right: 15px;
        }
        
        .star {
            position: absolute;
            width: 20px;
            height: 20px;
            background: white;
            clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
            opacity: 0.4;
            animation: pulse 2s ease-in-out infinite;
        }
        
        .star-1 { top: 15%; left: 20%; animation-delay: 0s; }
        .star-2 { top: 25%; right: 25%; animation-delay: 0.5s; }
        .star-3 { bottom: 20%; left: 15%; animation-delay: 1s; }
        .star-4 { bottom: 30%; right: 20%; animation-delay: 1.5s; }
        
        .container {
            max-width: 600px;
            width: 100%;
            position: relative;
            z-index: 10;
        }
        
        .card {
            background: white;
            border-radius: 30px;
            padding: 50px 40px;
            text-align: center;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
            position: relative;
        }
        
        .lock-icon {
            width: 100px;
            height: 100px;
            background: linear-gradient(135deg, #ffd89b 0%, #ff9a9e 100%);
            border-radius: 50%;
            margin: 0 auto 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: wiggle 3s ease-in-out infinite;
            box-shadow: 0 10px 30px rgba(255, 154, 158, 0.4);
        }
        
        .lock-body {
            width: 35px;
            height: 40px;
            background: white;
            border-radius: 8px;
            position: relative;
        }
        
        .lock-shackle {
            width: 30px;
            height: 25px;
            border: 5px solid white;
            border-radius: 15px 15px 0 0;
            position: absolute;
            top: -20px;
            left: 50%;
            transform: translateX(-50%);
            border-bottom: none;
        }
        
        .keyhole {
            width: 8px;
            height: 12px;
            background: linear-gradient(135deg, #ffd89b 0%, #ff9a9e 100%);
            border-radius: 50% 50% 0 0;
            position: absolute;
            top: 12px;
            left: 50%;
            transform: translateX(-50%);
        }
        
        .keyhole::after {
            content: '';
            width: 3px;
            height: 8px;
            background: linear-gradient(135deg, #ffd89b 0%, #ff9a9e 100%);
            position: absolute;
            bottom: -8px;
            left: 50%;
            transform: translateX(-50%);
        }
        
        .error-number {
            font-size: 100px;
            font-weight: 900;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin: 20px 0;
            line-height: 1;
            animation: bounce 2s ease-in-out infinite;
        }
        
        .title {
            font-size: 32px;
            color: #4a5568;
            font-weight: 900;
            margin-bottom: 15px;
        }
        
        .description {
            font-size: 16px;
            color: #718096;
            line-height: 1.6;
            margin-bottom: 35px;
        }
        
        .button {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            font-size: 16px;
            font-weight: 700;
            padding: 15px 40px;
            border-radius: 50px;
            text-decoration: none;
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
            transition: all 0.3s ease;
        }
        
        .button:hover {
            transform: translateY(-3px) scale(1.05);
            box-shadow: 0 15px 40px rgba(102, 126, 234, 0.5);
        }
        
        .emoji-row {
            font-size: 30px;
            margin-top: 20px;
            opacity: 0.7;
        }
        
        .pencil {
            position: absolute;
            width: 60px;
            height: 8px;
            background: linear-gradient(90deg, #ffd89b 0%, #ffb347 100%);
            border-radius: 5px;
            animation: spin 10s linear infinite;
        }
        
        .pencil::before {
            content: '';
            width: 0;
            height: 0;
            border-left: 15px solid #ff9a9e;
            border-top: 4px solid transparent;
            border-bottom: 4px solid transparent;
            position: absolute;
            right: -15px;
        }
        
        .pencil::after {
            content: '';
            width: 10px;
            height: 8px;
            background: #333;
            position: absolute;
            left: 0;
            border-radius: 5px 0 0 5px;
        }
        
        .pencil-1 { top: 10%; right: 15%; }
        .pencil-2 { bottom: 15%; left: 10%; animation-direction: reverse; }
        
        .book {
            position: absolute;
            width: 40px;
            height: 50px;
            background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
            border-radius: 3px;
            animation: float 5s ease-in-out infinite;
        }
        
        .book::before {
            content: '';
            width: 2px;
            height: 50px;
            background: rgba(255, 255, 255, 0.5);
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
        }
        
        .book-1 { top: 20%; left: 5%; }
        .book-2 { bottom: 25%; right: 8%; animation-delay: 1s; }
        
        @media (max-width: 768px) {
            .card { padding: 40px 25px; }
            .error-number { font-size: 80px; }
            .title { font-size: 26px; }
            .description { font-size: 14px; }
            .button { padding: 12px 30px; font-size: 14px; }
        }
    </style>
</head>
<body>
    <!-- Clouds -->
    <div class="cloud cloud-1"></div>
    <div class="cloud cloud-2"></div>
    
    <!-- Stars -->
    <div class="star star-1"></div>
    <div class="star star-2"></div>
    <div class="star star-3"></div>
    <div class="star star-4"></div>
    
    <!-- Pencils -->
    <div class="pencil pencil-1"></div>
    <div class="pencil pencil-2"></div>
    
    <!-- Books -->
    <div class="book book-1"></div>
    <div class="book book-2"></div>

    <div class="container">
        <div class="card">
            <!-- Lock Icon -->
            <div class="lock-icon">
                <div class="lock-body">
                    <div class="lock-shackle"></div>
                    <div class="keyhole"></div>
                </div>
            </div>
            
            <!-- Error Number -->
            <h1 class="error-number">403</h1>
            
            <!-- Title -->
            <h2 class="title">Ups! Pintu Ini Terkunci 🔒</h2>
            
            <!-- Description -->
            <p class="description">
                Maaf ya, Ebook untuk Alumni masih belum tersedia. Tapi jangan khawatir, kamu masih bisa mengakses banyak konten seru lainnya di Alazka Ebook!
            </p>
            
            <!-- Button -->
            <a href="{{ url('/dashboard') }}" class="button">
                🏠 Kembali ke Beranda
            </a>
            
            <!-- Emoji Row -->
            <div class="emoji-row">
                📚 ✏️ 🎨 🌈
            </div>
        </div>
    </div>
</body>
</html>