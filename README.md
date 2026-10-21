# Demo platformy – Not Even Delta

Interaktivní prototyp slouží pro prezentaci rolí a stavů členství před napojením na backend.

## Spuštění

Z kořene repozitáře spusťte:

```bash
python3 -m http.server 4173
```

Poté otevřete [http://localhost:4173](http://localhost:4173).

## Testování a validace

Z kořene repozitáře spusťte kompletní testovací sadu:

```bash
node --test tests/*.test.mjs
```

## Přihlášení a testovací účty

Přihlášení používá **výběr účtu (account picker)**, nikoli skutečné přihlašovací údaje, hesla ani ověření identity.

| Účet | Role | Stav členství |
|---|---|---|
| `administrator` | Administrátor | `active` |
| `vedeni` | Vedení | `active` |
| `pokladnik` | Pokladník | `active` |
| `organizator` | Organizátor | `active` |
| `clen_active` | Člen | `active` |
| `clen_pending` | Člen | `pending_approval` |
| `clen_expired` | Člen | `expired` |
| `clen_suspended` | Člen | `suspended` |

## Prezentační scénář (5 minut)

1. Vyberte `clen_pending`: člen čeká na schválení a má přístup pouze k profilu.
2. Vyberte `administrator`, otevřete **Členové** a schvalte čekající registraci. Schválený účet přejde do stavu `expired`.
3. Vyberte `clen_expired`: profil ukáže prošlé členství a akci pro simulaci platby.
4. Simulujte úspěšnou platbu. Stav se změní na `active` a po návratu je dostupný dashboard i moduly člena.
5. Vyberte `clen_suspended`: účet je pozastavený a zůstává v režimu pouze s profilem.

## Omezení dema

Demo používá pouze **mock data**. Není napojené na reálnou platební bránu ani banku; simulace platby nemění žádné skutečné platby ani bankovní transakce.
