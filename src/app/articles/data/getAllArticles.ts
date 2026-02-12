import type { ArticleData } from '../types';

/**
 * Асинхронно импортирует все статьи.
 * Исключены служебные файлы и сам этот модуль.
 * Возвращает массив объектов ArticleData.
 */
export async function getAllArticles(): Promise<ArticleData[]> {
  const modules = await Promise.all([
    import('./5-trendov-v-strategicheskom-konsaltinge-2025'),
    import('./kak-vybrat-konsaltingovuyu-kompaniiu-7-kriteriev'),
    import('./kak-rasschitat-tochku-bezubytochnosti-vashego-biznesa'),
    import('./finansovoe-planirovanie-dlia-startapov-s-chego-nachat'),
    import('./upravlenie-denezhnymi-potokami-kak-izbezhat-kassovogo-razryva'),
    import('./nalogovaya-optimizatsiya-dlya-malogo-biznesa-zakonnye-sposoby'),
    import('./biznes-model-kak-opisat-i-protestirovat'),
    import('./delegirovanie-kak-peredavat-zadachi-i-ne-teryat-kontrol'),
    import('./kpi-dlya-sotrudnikov-kak-razrabotat-i-vnedrit'),
    import('./unit-ekonomika-kak-poschitat-i-zachem-ona-nuzhna'),
    import('./masshtabirovanie-biznesa-kogda-i-kak-rasti'),
    import('./kak-provesti-swot-analiz-i-prinyat-vernoe-reshenie'),
    import('./byudzhetirovanie-kak-sostavit-i-kontrolirovat-byudzhet-kompanii'),
    import('./kak-zashchitit-intellektualnuyu-sobstvennost-vashego-biznesa'),
    import('./vedenie-peregovorov-klyuchevye-pravila-dlya-predprinimatelya'),
    import('./kak-nanimat-silnykh-sotrudnikov-poshagovoe-rukovodstvo'),
    import('./upravlenie-proektami-kak-uspevat-v-srok-i-v-ramkakh-byudzheta'),
    import('./klientskiy-servis-kak-prevratit-klientov-v-fanatov-brenda'),
    import('./analiz-konkurentov-kak-nayti-i-ispolzovat-ikh-slabye-storony'),
    import('./tsenoobrazovanie-kak-ustanovit-pravilnuyu-tsenu-na-vash-produkt'),
    import('./kak-podgotovitsya-k-vstreche-s-investorom'),
    import('./yuridicheskaya-bezopasnost-biznesa-chto-proverit-v-pervuyu-ochered'),
    import('./go-to-market-strategiya-vyvoda-produkta-na-rynok'),
    import('./fond-oplaty-truda-kak-planirovat-i-kontrolirovat'),
    import('./bootstrapping-vs-venchurnye-investitsii'),
    import('./chto-takoe-ebitda-i-pochemu-investory-ee-lyubyat'),
    import('./customer-journey-map-kak-narisovat-put-klienta'),
    import('./kak-vnedrit-crm-sistemu-instruktsiya'),
    import('./lean-podkhod-dlya-sfery-uslug'),
    import('./okr-kak-postavit-tseli-kotorye-vdokhnovlyayut'),
    import('./pest-analiz-kak-otsenit-vliyanie-vneshnikh-faktorov'),
    import('./strategiya-golubogo-okeana-kak-nayti-svoyu-nishu'),
    import('./upravlenie-oborotnym-kapitalom'),
    import('./avtomatizatsiya-biznes-protsessov-s-chego-nachat'),
    import('./kak-chitat-tri-glavnykh-finansovykh-otcheta-dds-opiu-i-balans'),
    import('./kak-davat-obratnuyu-svyaz'),
    import('./kak-provodit-effektivnye-soveshchaniya'),
    import('./kak-uvolit-sotrudnika-pravilno'),
    import('./kontent-marketing-dlya-slozhnykh-produktov'),
    import('./lichnyy-brend-osnovatelya-kak-on-pomogaet-biznesu'),
    import('./nematerialnaya-motivatsiya-10-sposobov'),
    import('./nps-net-promoter-score-kak-izmerit-loyalnost'),
    import('./onboarding-kak-adaptirovat-novogo-sotrudnika'),
    import('./pivot-kogda-i-kak-menyat-biznes-model'),
    import('./postroenie-korporativnoy-kultury-s-nulya'),
    import('./postroenie-voronki-prodazh-b2b'),
    import('./upravlencheskiy-uchet-svoimi-rukami-kak-sobrat-dashboard-dlya-direktora'),
    import('./upravlenie-riskami-kak-sostavit-plan-b'),
  ]);

  return modules.map((mod) => mod.default as ArticleData);
}