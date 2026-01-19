import 'package:flutter/material.dart';
import 'package:sourdough_timer/screens/calculator_tab_screen.dart';
import 'package:sourdough_timer/screens/timer_screen.dart';
import 'package:sourdough_timer/screens/my_recipes_screen.dart';
import 'package:sourdough_timer/screens/guide_screen.dart';
import 'package:sourdough_timer/screens/settings_screen.dart';

class MainScreen extends StatefulWidget {
  const MainScreen({super.key});

  static final GlobalKey<_MainScreenState> globalKey = GlobalKey<_MainScreenState>();

  @override
  State<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  int _selectedIndex = 0;

  static const List<Widget> _widgetOptions = <Widget>[
    MyRecipesScreen(),
    GuideScreen(),
    CalculatorTabScreen(),
    TimerScreen(),
    SettingsScreen(),
  ];

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  void switchToTab(int index) {
    if (index >= 0 && index < _widgetOptions.length) {
      setState(() {
        _selectedIndex = index;
      });
    }
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
