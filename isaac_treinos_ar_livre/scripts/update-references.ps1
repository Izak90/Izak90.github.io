# Script PowerShell para Atualizar Referências
# Atualiza todas as páginas HTML com as novas otimizações

Write-Host "🚀 Atualizando referências JavaScript e CSS..." -ForegroundColor Green
Write-Host ""

# Encontrar todos os arquivos HTML
$htmlFiles = Get-ChildItem -Path . -Include *.html -Recurse

$totalFiles = $htmlFiles.Count
$updatedFiles = 0

foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw
    $originalContent = $content
    $updated = $false
    
    Write-Host "📄 Processando: $($file.Name)" -ForegroundColor Cyan
    
    # 1. Atualizar Lucide Icons para versão específica
    if ($content -match 'lucide@latest') {
        $content = $content -replace 'lucide@latest', 'lucide@0.294.0/dist/umd/lucide.min'
        Write-Host "  ✅ Lucide atualizado para versão específica" -ForegroundColor Green
        $updated = $true
    }
    
    # 2. Adicionar preconnect para unpkg se não existir
    if ($content -match 'unpkg.com' -and $content -notmatch 'preconnect.*unpkg') {
        $content = $content -replace '(<!-- Lucide Icons.*?>)', "`$1`n    <link rel=`"preconnect`" href=`"https://unpkg.com`">"
        Write-Host "  ✅ Preconnect para unpkg adicionado" -ForegroundColor Green
        $updated = $true
    }
    
    # 3. Otimizar carregamento de Google Fonts
    if ($content -match 'fonts.googleapis.com.*rel="stylesheet"' -and $content -notmatch 'media="print"') {
        $content = $content -replace '(href="https://fonts.googleapis.com[^"]+")(\s+rel="stylesheet")', '$1 rel="stylesheet" media="print" onload="this.media=''all''"'
        
        # Adicionar noscript fallback após a tag de font
        $content = $content -replace '(href="https://fonts.googleapis.com[^"]+"\s+rel="stylesheet"[^>]*>)', "`$1`n    <noscript><link href=`"https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap`" rel=`"stylesheet`"></noscript>"
        
        Write-Host "  ✅ Font loading otimizado" -ForegroundColor Green
        $updated = $true
    }
    
    # 4. Adicionar mobile-optimizations.css se não existir
    if ($content -match 'assets/css' -and $content -notmatch 'mobile-optimizations.css') {
        # Encontrar a última ocorrência de stylesheet
        $lastStylesheet = [regex]::Matches($content, '<link rel="stylesheet"[^>]+>') | Select-Object -Last 1
        
        if ($lastStylesheet) {
            $insertPoint = $lastStylesheet.Index + $lastStylesheet.Length
            $newCss = "`n    <link rel=`"stylesheet`" href=`"assets/css/mobile-optimizations.css`">"
            $content = $content.Insert($insertPoint, $newCss)
            
            Write-Host "  ✅ mobile-optimizations.css adicionado" -ForegroundColor Green
            $updated = $true
        }
    }
    
    # Salvar apenas se houve mudanças
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -NoNewline
        $updatedFiles++
        Write-Host "  💾 Arquivo salvo com sucesso" -ForegroundColor Yellow
    } else {
        Write-Host "  ℹ️  Nenhuma alteração necessária" -ForegroundColor Gray
    }
    
    Write-Host ""
}

Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Magenta
Write-Host "✅ CONCLUÍDO!" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Magenta
Write-Host ""
Write-Host "📊 Estatísticas:" -ForegroundColor Cyan
Write-Host "   Total de arquivos: $totalFiles" -ForegroundColor White
Write-Host "   Arquivos atualizados: $updatedFiles" -ForegroundColor Green
Write-Host "   Sem alterações: $($totalFiles - $updatedFiles)" -ForegroundColor Gray
Write-Host ""
Write-Host "📝 Próximos passos:" -ForegroundColor Yellow
Write-Host "   1. Testar as páginas em navegador" -ForegroundColor White
Write-Host "   2. Verificar console do browser para erros" -ForegroundColor White
Write-Host "   3. Validar em dispositivos móveis" -ForegroundColor White
Write-Host "   4. Executar Lighthouse para métricas" -ForegroundColor White
Write-Host ""
Write-Host "📚 Consulte GUIA-IMPLEMENTACAO-MOBILE.md para mais detalhes" -ForegroundColor Cyan
