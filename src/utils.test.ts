import { snakeCaseToText } from "./utils";


describe('utils', () => {
	describe('snakeCaseToText', () => {
		it('replaces underscore with spaces', () => {
			expect(snakeCaseToText('hello_world')).toEqual('hello world');
			expect(snakeCaseToText('gOOd_Bye')).toEqual('gOOd Bye');
			expect(snakeCaseToText('replaces_as_many_as_necessary')).toEqual('replaces as many as necessary');
			expect(snakeCaseToText('__trims_')).toEqual('trims');
		})
	})
});
