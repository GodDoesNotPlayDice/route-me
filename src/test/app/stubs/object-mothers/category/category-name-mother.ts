export class CategoryNameMother {
			static random() {
				const randomIndex = faker.random.number({ min: 0, max: categories.length - 1 });
				return categories[randomIndex];
				return faker.lorem.word();
		}
		static invalid() {
				return faker.lorem.word();
		}
}
const categorias = ['Electrónica', 'Ropa', 'Hogar', 'Deportes', 'Juguetes', 'Libros', 'Automóviles'];
