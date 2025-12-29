import 'package:flutter/material.dart';
import 'package:sourdough_timer/screens/calculator_screen.dart';
import 'package:sourdough_timer/screens/dough_calculator_screen.dart';

class CalculatorTabScreen extends StatelessWidget {
  const CalculatorTabScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 2,
      child: Scaffold(
        appBar: AppBar(
          title: const Text('계산기'),
          bottom: const TabBar(
            tabs: [
              Tab(text: '베이커스'),
              Tab(text: '도우'),
            ],
          ),
        ),
        body: const TabBarView(
          children: [
            CalculatorScreen(),
            DoughCalculatorScreen(),
          ],
        ),
      ),
    );
  }
}
