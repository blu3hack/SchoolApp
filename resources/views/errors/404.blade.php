<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 - Halaman Tidak Ditemukan</title>
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
            50% { transform: translateY(-15px); }
        }
        
        @keyframes swing {
            0%, 100% { transform: rotate(-5deg); }
            50% { transform: rotate(5deg); }
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
        
        @keyframes fly {
            0% { transform: translate(0, 0) rotate(0deg); }
            25% { transform: translate(20px, -20px) rotate(5deg); }
            50% { transform: translate(0, -40px) rotate(0deg); }
            75% { transform: translate(-20px, -20px) rotate(-5deg); }
            100% { transform: translate(0, 0) rotate(0deg); }
        }
        
        body {
            background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 25%, #ff9a9e 50%, #fecfef 75%, #a8edea 100%);
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
            opacity: 0.4;
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
            top: 15%;
            left: 8%;
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
            top: 60%;
            right: 5%;
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
        
        .balloon {
            position: absolute;
            width: 50px;
            height: 60px;
            border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
            animation: float 4s ease-in-out infinite;
        }
        
        .balloon::after {
            content: '';
            position: absolute;
            width: 2px;
            height: 80px;
            background: rgba(255, 255, 255, 0.5);
            top: 60px;
            left: 50%;
            transform: translateX(-50%);
        }
        
        .balloon-1 {
            background: linear-gradient(135deg, #ff6b6b, #ee5a6f);
            top: 20%;
            left: 15%;
            animation-delay: 0s;
        }
        
        .balloon-2 {
            background: linear-gradient(135deg, #4facfe, #00f2fe);
            top: 70%;
            right: 20%;
            animation-delay: 1s;
        }
        
        .balloon-3 {
            background: linear-gradient(135deg, #43e97b, #38f9d7);
            bottom: 10%;
            left: 10%;
            animation-delay: 2s;
        }
        
        .paper-plane {
            position: absolute;
            width: 40px;
            height: 40px;
            animation: fly 8s ease-in-out infinite;
        }
        
        .paper-plane::before {
            content: '';
            position: absolute;
            width: 0;
            height: 0;
            border-left: 40px solid #fff;
            border-top: 20px solid transparent;
            border-bottom: 20px solid transparent;
            opacity: 0.6;
        }
        
        .plane-1 { top: 25%; right: 15%; }
        .plane-2 { bottom: 30%; left: 20%; animation-delay: 2s; }
        
        .container {
            max-width: 650px;
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
        
        .magnifying-glass {
            width: 120px;
            height: 120px;
            margin: 0 auto 30px;
            position: relative;
            animation: swing 3s ease-in-out infinite;
        }
        
        .glass-circle {
            width: 80px;
            height: 80px;
            border: 8px solid #ff9a9e;
            border-radius: 50%;
            position: relative;
            background: linear-gradient(135deg, rgba(255, 154, 158, 0.2), rgba(250, 208, 196, 0.3));
        }
        
        .glass-handle {
            width: 8px;
            height: 50px;
            background: #ff9a9e;
            border-radius: 10px;
            position: absolute;
            bottom: -45px;
            right: 5px;
            transform: rotate(45deg);
        }
        
        .question-mark {
            font-size: 40px;
            color: #ff9a9e;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-weight: 900;
        }
        
        .error-number {
            font-size: 100px;
            font-weight: 900;
            background: linear-gradient(135deg, #fa709a 0%, #fee140 50%, #30cfd0 100%);
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
            line-height: 1.8;
            margin-bottom: 35px;
        }
        
        .button {
            display: inline-block;
            background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
            color: white;
            font-size: 16px;
            font-weight: 700;
            padding: 15px 40px;
            border-radius: 50px;
            text-decoration: none;
            box-shadow: 0 10px 30px rgba(250, 112, 154, 0.4);
            transition: all 0.3s ease;
        }
        
        .button:hover {
            transform: translateY(-3px) scale(1.05);
            box-shadow: 0 15px 40px rgba(250, 112, 154, 0.5);
        }
        
        .emoji-row {
            font-size: 30px;
            margin-top: 20px;
            opacity: 0.7;
        }
        
        .star {
            position: absolute;
            width: 20px;
            height: 20px;
            background: white;
            clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
            opacity: 0.5;
            animation: pulse 2s ease-in-out infinite;
        }
        
        .star-1 { top: 12%; right: 25%; animation-delay: 0s; }
        .star-2 { top: 35%; left: 18%; animation-delay: 0.5s; }
        .star-3 { bottom: 25%; right: 15%; animation-delay: 1s; }
        .star-4 { bottom: 15%; left: 22%; animation-delay: 1.5s; }
        
        @media (max-width: 768px) {
            .card { padding: 40px 25px; }
            .error-number { font-size: 80px; }
            .title { font-size: 26px; }
            .description { font-size: 14px; }
            .button { padding: 12px 30px; font-size: 14px; }
            .magnifying-glass { width: 100px; height: 100px; }
            .glass-circle { width: 70px; height: 70px; }
            .question-mark { font-size: 35px; }
        }
    </style>
</head>
<body>
    <!-- Clouds -->
    <div class="cloud cloud-1"></div>
    <div class="cloud cloud-2"></div>
    
    <!-- Balloons -->
    <div class="balloon balloon-1"></div>
    <div class="balloon balloon-2"></div>
    <div class="balloon balloon-3"></div>
    
    <!-- Paper Planes -->
    <div class="paper-plane plane-1"></div>
    <div class="paper-plane plane-2"></div>
    
    <!-- Stars -->
    <div class="star star-1"></div>
    <div class="star star-2"></div>
    <div class="star star-3"></div>
    <div class="star star-4"></div>

    <div class="container">
        <div class="card">
            <!-- Magnifying Glass Icon -->
            <div class="magnifying-glass">
                <div class="glass-circle">
                    <div class="question-mark">?</div>
                </div>
                <div class="glass-handle"></div>
            </div>
            
            <!-- Error Number -->
            <h1 class="error-number">404</h1>
            
            <!-- Title -->
            <h2 class="title">Halaman Hilang! 🔍</h2>
            
            <!-- Description -->
            <p class="description">
                Waduh! Halaman yang kamu cari sepertinya sedang main petak umpet.<br>
                Mungkin halaman ini pindah tempat atau tidak ada lagi.<br>
                Yuk, kembali ke beranda dan cari yang lain!
            </p>
            
            <!-- Button -->
            <a href="{{ url('/dashboard') }}" class="button">
                🏠 Kembali ke Beranda
            </a>
            
            <!-- Emoji Row -->
            <div class="emoji-row">
                🎈 ✈️ 🌟 🎨
            </div>
        </div>
    </div>
</body>
</html>