import { ExitModal } from "./exit";
import { renderWithProviders } from "../../utils/test/test-utils";

describe('test exitModal', ()=> {
    it('should render exitModal', ()=> {
        renderWithProviders(<ExitModal />, {
        preloadedState: {
            exR: true
          }
        });
    })
})