import 'dart:io';
import 'package:flutter_native_splash/flutter_native_splash.dart';
import 'package:sourdough_timer/database/database.dart';
import 'package:sourdough_timer/repositories/recipe_repository.dart';
import 'package:sourdough_timer/repositories/timer_repository.dart';
import 'package:sourdough_timer/services/background_service.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sourdough_timer/screens/splash_screen.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:google_mobile_ads/google_mobile_ads.dart';
import 'package:provider/provider.dart';

Future<void> main() async {
  final widgetsBinding = WidgetsFlutterBinding.ensureInitialized();
  FlutterNativeSplash.preserve(widgetsBinding: widgetsBinding);
  SystemChrome.setPreferredOrientations([
    DeviceOrientation.portraitUp,
    DeviceOrientation.portraitDown,
  ]);

  // Request notification permissions for Android
  final FlutterLocalNotificationsPlugin flutterLocalNotificationsPlugin =
      FlutterLocalNotificationsPlugin();
  await flutterLocalNotificationsPlugin
      .resolvePlatformSpecificImplementation<
          AndroidFlutterLocalNotificationsPlugin>()
      ?.requestNotificationsPermission();

  // Initialize background service only on mobile platforms
  if (Platform.isAndroid || Platform.isIOS) {
    await initializeService();
    await MobileAds.instance.initialize();
  }

  runApp(
    MultiProvider(
      providers: [
        // Database provider (base layer)
        Provider<AppDatabase>(
          create: (context) => AppDatabase(),
          dispose: (context, db) => db.close(),
        ),
        // Recipe repository (depends on AppDatabase)
        ProxyProvider<AppDatabase, RecipeRepository>(
          update: (context, db, _) => RecipeRepositoryImpl(db),
        ),
        // Timer repository (depends on AppDatabase)
        ProxyProvider<AppDatabase, TimerRepository>(
          update: (context, db, _) => TimerRepositoryImpl(db),
        ),
      ],
      child: const MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: '사워도우 베이킹 도우미',
      debugShowCheckedModeBanner: false, // DEBUG 배너 제거
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.brown),
        fontFamily: 'Pretendard', // You might want to add a custom font
      ),
      home: const SplashScreen(),
    );
  }
}