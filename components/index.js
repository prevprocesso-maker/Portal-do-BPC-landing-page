// Export all components to window for consuming projects
import { Button } from './Button.jsx';
import { Card } from './Card.jsx';
import { Input } from './Input.jsx';

Object.assign(window, {
  Button,
  Card,
  Input,
});
