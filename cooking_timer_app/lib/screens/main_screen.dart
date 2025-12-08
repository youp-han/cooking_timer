import 'package:flutter/material.dart';
import 'package:cooking_timer_app/screens/calculator_screen.dart';
import 'package:cooking_timer_app/screens/timer_screen.dart';
import 'package:cooking_timer_app/screens/my_recipes_screen.dart';
import 'package:cooking_timer_app/screens/guide_screen.dart';
import 'package:cooking_timer_app/screens/settings_screen.dart';

class MainScreen extends StatefulWidget {
  const MainScreen({super.key});

  @override
  State<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  int _selectedIndex = 0;

  static const List<Widget> _widgetOptions = <Widget>[
    MyRecipesScreen(),
    GuideScreen(),
    CalculatorScreen(),
    TimerScreen(),
    SettingsScreen(),
  ];

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: _widgetOptions.elementAt(_selectedIndex),
      ),
      bottomNavigationBar: BottomNavigationBar(
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(Icons.book),
            label: '내 레시피',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.lightbulb),
            label: '가이드',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.calculate),
            label: '계산기',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.timer),
            label: '타이머',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.settings),
            label: '설정',
          ),
        ],
        currentIndex: _selectedIndex,
        selectedItemColor: Theme.of(context).colorScheme.primary,
        unselectedItemColor: Colors.grey,
        onTap: _onItemTapped,
        type: BottomNavigationBarType.fixed,
      ),
    );
  }
}
