/**
 * @jest-environment jsdom
 */

import { fireEvent, screen } from "@testing-library/dom"

//import store from "../app/Store.js"
import { ROUTES_PATH } from '../constants/routes.js'
//import {localStorageMock} from "../__mocks__/localStorage.js";

import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"
import Store from "../app/Store.js"

describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    test("Then New bill form shold be here.", () => {
      const html = NewBillUI()
      document.body.innerHTML = html
      //to-do write assertion
      const newBill = new NewBill({ document, onNavigate: ROUTES_PATH.Bills, store: null, localStorage: window.localStorage })
      expect(newBill).toBeTruthy()
    })

    test("Test n°2", () => {
      const html = NewBillUI()
      document.body.innerHTML = html
      const newBill = new NewBill({ document, onNavigate: ROUTES_PATH.Bills, store: Store, localStorage: window.localStorage })
      const changeFile = screen.getByTestId('file')
      const HandleChangeFile = jest.fn((e) => newBill.handleChangeFile(e))
      changeFile.addEventListener('change', HandleChangeFile)
      fireEvent.change(changeFile)
      expect(HandleChangeFile).toHaveBeenCalled()
    })

    test("test n°3", () => {
      const newBill = new NewBill({ document, onNavigate: ROUTES_PATH.NewBill, store: Store, localStorage: window.localStorage })
      const formNewBill = screen.getByTestId('form-new-bill')
      const user = {"type":"Employee","email":"employee@test.tdl","password":"employee","status":"connected"}

      /* les données envoié dans handleSubmit */
      const HandleSubmit = jest.fn((e) => newBill.handleSubmit(e, user))
      formNewBill.addEventListener('submit', HandleSubmit)
      fireEvent.submit(formNewBill)
      expect(HandleSubmit).toHaveBeenCalled()
    })
    test("test async", async () => {
      const newBill = new NewBill({ document, onNavigate: ROUTES_PATH.Bills, store: Store, localStorage: window.localStorage })
      const HandleChangeFile = jest.fn((e) => newBill.handleChangeFile(e))
      const storeBill = Store.bill(HandleChangeFile)
      return storeBill.then(data => {
        expect(data).toBeTruthy()
      })
    })
  })
})
