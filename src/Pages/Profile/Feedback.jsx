import React from 'react';

const feedbacks = [
  {
    id: 1,
    name: 'Sarah Johnson',
    title: 'CEO, BrightTech',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
    feedback: 'This platform completely transformed the way we manage our workflows. Excellent support team!',
    rating: 5,
  },
  {
    id: 2,
    name: 'James Miller',
    title: 'Product Manager, InnovateX',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    feedback: 'A user-friendly and powerful tool. It has helped us scale operations significantly.',
    rating: 4,
  },
  {
    id: 3,
    name: 'Emily Chen',
    title: 'Freelance Designer',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    feedback: 'The interface is intuitive and sleek. I love how quickly I can organize my projects.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Michael Patel',
    title: 'CTO, SoftCore Systems',
    image: 'https://randomuser.me/api/portraits/men/77.jpg',
    feedback: 'Reliable, fast, and constantly improving. It’s a must-have for any serious team.',
    rating: 4,
  },
];

const Feedback = () => {
  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-10 dark:text-white">
        What Our Clients Say
      </h1>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {feedbacks.map((fb) => (
          <div
            key={fb.id}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition"
          >
            <div className="flex items-center mb-4">
              <img
                src={fb.image}
                alt={fb.name}
                className="w-14 h-14 rounded-full border-2 border-blue-500"
              />
              <div className="ml-4">
                <h3 className="text-lg font-semibold dark:text-white">{fb.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-300">{fb.title}</p>
              </div>
            </div>

            <p className="text-gray-700 dark:text-gray-200 mb-4">{`"${fb.feedback}"`}</p>

            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`h-5 w-5 ${
                    i < fb.rating ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974 4.18.012c.969.003 1.371 1.24.588 1.81l-3.385 2.46 1.269 3.905c.3.922-.755 1.688-1.538 1.118L10 13.347l-3.351 2.859c-.783.57-1.838-.196-1.538-1.118l1.269-3.905-3.385-2.46c-.783-.57-.38-1.807.588-1.81l4.18-.012 1.286-3.974z" />
                </svg>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feedback;
