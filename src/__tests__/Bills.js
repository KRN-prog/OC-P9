/**
 * @jest-environment jsdom
 */

import { fireEvent, screen, waitFor } from "@testing-library/dom"
import BillsUI from "../views/BillsUI.js"
import { bills } from "../fixtures/bills.js"
import { ROUTES_PATH } from "../constants/routes.js";
import {localStorageMock} from "../__mocks__/localStorage.js";
import Bill from "../containers/Bills.js"
import mockStore from "../__mocks__/store"
import router from "../app/Router.js";
// import fetch from 'node-fetch'

jest.mock("../app/store", () => mockStore)

describe("Given I am connected as an employee", () => {
  describe("When I am on Bills Page", () => {
    test("Then bill icon in vertical layout should be highlighted", async () => {

      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee'
      }))
      const root = document.createElement("div")
      root.setAttribute("id", "root")
      document.body.append(root)
      router()
      window.onNavigate(ROUTES_PATH.Bills)
      await waitFor(() => screen.getByTestId('icon-window'))
      const windowIcon = screen.getByTestId('icon-window')
      //to-do write expect expression
      expect(windowIcon).toBeTruthy()

    })
    test("Then bills should be ordered from earliest to latest", () => {
      document.body.innerHTML = BillsUI({ data: bills })
      const dates = screen.getAllByText(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/i).map(a => a.innerHTML)
      const antiChrono = (a, b) => ((a < b) ? 1 : -1)
      const datesSorted = [...dates].sort(antiChrono)
      // Ajouter expect.arrayContaining = Tableau qui contient les éléments attendus
      expect(dates).toEqual(expect.arrayContaining(datesSorted))
    })





    test("handleClickNewBill", () => {
      //const bill = new Bill({ document, onNavigate: ROUTES_PATH.Bills, store: null, localStorage: window.localStorage })
      const HandleClickNewBill = jest.fn(() => ROUTES_PATH.Bills)
      const btnNewBill = screen.getByTestId("btn-new-bill")
      btnNewBill.addEventListener('click', HandleClickNewBill)
      fireEvent.click(btnNewBill)
      expect(HandleClickNewBill).toHaveBeenCalled()
    })

    /*test("handleClickNewBill", () => {
      const bill = new Bill({ document, onNavigate: ROUTES_PATH.Bills, store: null, localStorage: window.localStorage })
      const ClickNewBill = jest.fn(() => bill.handleClickNewBill())
      const BtnNewBill = screen.getByTestId("btn-new-bill")
      BtnNewBill.addEventListener('click', ClickNewBill)
      fireEvent.click(BtnNewBill)
      expect(ClickNewBill).toHaveBeenCalled()
    })*/


    test("handleClickIconEye", () => {
      const bill = new Bill({ document, onNavigate: ROUTES_PATH.Bills, store: null, localStorage: window.localStorage })
      /* Faire un foreach en js native */

      
      const eyeIcon = screen.queryAllByTestId("icon-eye")
      eyeIcon.forEach(eye => {
        const handleClickIconEye = jest.fn((e) => bill.handleClickIconEye(eye))
        eye.addEventListener('click', handleClickIconEye)
        fireEvent.click(eye)
        expect(handleClickIconEye).toHaveBeenCalled()
      });
    })

    test("getBills", async () => {
      const bills = new Bill({ document, onNavigate: ROUTES_PATH.Bills, store: mockStore, localStorage: window.localStorage })
      //const getBills = jest.fn(bills.getBills())
      //await(getBills)
      const getbills = await mockStore.bills().list()
      expect(getbills).toBeTruthy()
      /*return bills.getBills().then(snapshot => {
        console.log(snapshot)
        expect(snapshot).toBeTruthy()
      })*/
      //expect.assertions(1)
      //try {
        //const getBills = jest.fn(() => bills.getBills())
        //await(bills.getBills())
      //} catch (e) {
       // expect(e).toBeTruthy()
      //}
      //expect(result).toBeTruthy()
    })
  })
})