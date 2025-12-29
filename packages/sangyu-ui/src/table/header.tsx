import { defineComponent } from 'vue';

export const Header = defineComponent({
	setup() {
		return () => {
			return (
				<thead>
					<tr>
						<th>1</th>
						<th>3</th>
						<th>3</th>
					</tr>
				</thead>
			);
		};
	},
});
