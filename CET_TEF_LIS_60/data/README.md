# Registo das UCs

`ucs.json` é a fonte central do índice principal. Alterar este ficheiro para atualizar links e metadata; não editar os adaptadores em memória do índice.

Cada UC contém:
- `slug`: identificador único e estável; PEVS/PEDEx/CF conservam `pevs`, `pedex`, `cf`.
- `title`: nome exato usado no horário; evitar renomear sem rever a correspondência das sessões.
- `order`: inteiro único; preserva a numeração dos cartões Estudo.
- `summary`, `training`, `simulator`, `workbook`: URLs relativos à raiz (`./...html`) ou null.
- `difficulties`: lista de `{id, label, bank}`; id easy/medium/hard, rótulo pt-PT e URL do JSON. Lista vazia quando não há banco nativo.
- `trainer`, `driveUrl`, `asynchronousClass`: metadata existente ou null.
- `sourceStatus.materials`: linked_not_imported — referências dos materiais existem, mas os originais não estão neste checkout.
- `sourceStatus.coverage`: declared_audit / not_audited / source_reviewed — declaração legada, ausência de auditoria ou revisão documentada dos originais. PEVS, PEDEx e CF usam source_reviewed com evidência em docs/PEVS_COVERAGE.md, docs/PEDEX_COVERAGE.md e docs/CF_COVERAGE.md; não significa certificação externa.
- `sourceStatus.workbook`: transcribed_unverified_key / no_exercises_reported — questões transcritas com chave inferida ou ausência reportada de exercícios Workbook.

Não criar links para páginas inexistentes nem declarar uma auditoria sem evidência. Os três nomes fixos dos bancos PEVS mantêm-se.

Depois de adicionar uma UC: manter os atributos data-* das páginas nativas coerentes, atualizar a política de temas P1 e o precache manual, incrementar a versão do cache e executar `node scripts/validate.cjs`. O índice Workbook ainda é estático; a geração de precache não foi migrada nesta fase.

Validação: `node --test scripts/validate.test.cjs scripts/uc-registry.test.cjs`. O fixture `scripts/fixtures/p2-legacy-metadata.json` conserva a metadata anterior à migração e permite detetar alterações acidentais aos URLs e à ordem; mudanças futuras intencionais exigem revisão deste teste.
