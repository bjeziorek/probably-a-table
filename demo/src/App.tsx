import './App.css'
import { ProbablyATable } from './../../src'
import { defaultFilters, filterMock, newData, newDataColumns } from './testMock'
import { docsDefaultFilters, docsFilterMock, docsData, docsColumns } from './docs';
import { Card, Text } from '@radix-ui/themes'

function App() {

  return (
    <>
      <section id="center" className='full-bg'>
        <Card>
          <Text>Press T to open Theme configuration</Text>
        </Card>

        <Card>
          <Text>In case you prefer reading normal readme.md instead the weird table below you where need to remember to click next page to see everything or change the table to show 50 items at once - here is the link: <a style={{ color: "blue", textDecoration: "underline" }} href="https://github.com/bjeziorek/probably-a-table/blob/main/README.md">README.MD</a> - but there is no such fancy built‑in seach... well, okay, there <i>is</i> Ctrl+F, good enough.</Text>
        </Card>

        <ProbablyATable columns={docsColumns} data={docsData} filters={docsFilterMock} defaultFilters={docsDefaultFilters}></ProbablyATable>
        <br></br><br></br>
        <Card>
          <Text>And below you’ll find a normal table — not forced into something it was never meant to be.
            You can:
            <ul>
              <li>- paginate</li>
              <li>- click column headers to sort</li>
              <li>- drag and drop</li>
              <li>- search</li>
              <li>- change numder of rows displayed at once</li>
              <li>- or... just admire how useless it it</li>
            </ul>
          </Text>
        </Card>

        <ProbablyATable columns={newDataColumns} data={newData} filters={filterMock} defaultFilters={defaultFilters}></ProbablyATable>


      </section>
    </>
  )
}

export default App
