import Header from './_components/header';
import PartyChart from './_components/party-chart';
import UfChart from './_components/uf-chart';

type HomeProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Home({ searchParams }: HomeProps) {
  let expensesType = searchParams.type || 'uf';
  const year = Number(searchParams.year) || 2024;

  if (expensesType !== 'uf' && expensesType !== 'party') {
    return null;
  }

  const ufRes = await fetch(
    `https://apis.codante.io/senator-expenses/summary/by-uf`
  );
  const ufData = await ufRes.json();

  const partyRes = await fetch(
    `https://apis.codante.io/senator-expenses/summary/by-party`
  );
  const partyData = await partyRes.json();

  return (
    <main className="container mx-auto py-16">
      <Header expensesType={expensesType} year={year} />
      {expensesType === 'uf' && <UfChart year={year} data={ufData} />}
      {expensesType === 'party' && <PartyChart year={year} data={partyData} />}
    </main>
  );
}
