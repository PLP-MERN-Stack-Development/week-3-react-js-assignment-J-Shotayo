import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <Card className="text-center">
          <h1 className="text-4xl font-bold mb-6">Welcome to Task Manager</h1>
          <p className="text-lg mb-8">
            A simple yet powerful task management application to help you organize your tasks and boost your productivity.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/tasks">
              <Button variant="primary" size="lg">
                Get Started
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Home;