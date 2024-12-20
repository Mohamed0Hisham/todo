export default function generateID() {
	const id = `${Math.floor(1000000000 + Math.random() * 9000000000)}`;
	return id;
}
