import 'dart:io';
import 'package:sourdough_timer/database/database.dart';
import 'package:sourdough_timer/services/background_service.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sourdough_timer/screens/login_screen.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:provider/provider.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
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
  }

  runApp(
    Provider<AppDatabase>(
      create: (context) => AppDatabase(),
      dispose: (context, db) => db.close(),
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
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.brown),
        fontFamily: 'Pretendard', // You might want to add a custom font
      ),
      home: const LoginScreen(),
    );
  }
}