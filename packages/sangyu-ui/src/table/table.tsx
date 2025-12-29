import { defineComponent } from 'vue';

export default defineComponent(
	() => {
		return () => {
			return (
				<div>
					<table>
						<header></header>
						<tbody>
							<tr>
								<td>John</td>
								<td>18</td>
								<td>New York</td>
							</tr>
							<tr>
								<td>Jane</td>
								<td>19</td>
								<td>New York</td>
							</tr>
						</tbody>
					</table>
				</div>
			);
		};
	},
	{
		name: 'SyTable',
	},
);
