const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
const Review = require('../models/review');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
	await Review.deleteMany({});
	await Campground.deleteMany({});
	for (let i = 0; i < 50; i++) {
		const random1000 = Math.floor(Math.random() * 1000);
		const price = Math.floor(Math.random() * 20) + 10;
		const camp = new Campground({
			location: `${cities[random1000].city}, ${cities[random1000].state}`,
			title: `${sample(descriptors)} ${sample(places)}`,
			images: [
				{
					url:
						'https://res.cloudinary.com/dj8kivwii/image/upload/v1614625311/YelpCamp/b6fviouiyiqmorhhlenc.jpg',
					filename: 'YelpCamp/b6fviouiyiqmorhhlenc'
				},
				{
					url:
						'https://res.cloudinary.com/dj8kivwii/image/upload/v1614625311/YelpCamp/ajbujs63e7zie81nqedf.jpg',
					filename: 'YelpCamp/ajbujs63e7zie81nqedf'
				}
			],
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione voluptates eligendi repudiandae illo labore recusandae omnis earum, odit nemo autem, molestiae consectetur excepturi est quisquam voluptatum tempora. Quaerat, earum omnis?',
			price,
			author: '603ad334ee354d221438cf5e'
		});
		await camp.save();
	}
};

seedDB().then(() => {
	mongoose.connection.close();
});
