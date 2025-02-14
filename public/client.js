document.addEventListener('DOMContentLoaded', () => {

    const body = document.body;

    const fNotes = document.createElement('div');
    fNotes.setAttribute('id', 'fNotes');

    const backdrop = document.createElement('div');
    backdrop.setAttribute('id', 'backdrop');
    fNotes.appendChild(backdrop);

    const header = document.createElement('header');
    header.setAttribute('id', 'header');

    const logo = document.createElement('div');
    logo.setAttribute('id', 'logo');
    header.appendChild(logo);

    const searchNotes = document.createElement('div');
    searchNotes.setAttribute('id', 'searchNotes');
    const searchNotesInput = document.createElement('input');
    searchNotesInput.setAttribute('type', 'text');
    searchNotesInput.setAttribute('id', 'inputSearchNotes');
    searchNotesInput.setAttribute('placeholder', 'Buscar notas...');
    searchNotes.appendChild(searchNotesInput);
    header.appendChild(searchNotes);
    fNotes.appendChild(header);

    const settings = document.createElement('div');
    settings.setAttribute('id', 'settings');
    const modeDarkLight = document.createElement('div');
    modeDarkLight.setAttribute('id', 'modeDarkLight');
    const chkDarkLight = document.createElement('input');
    chkDarkLight.setAttribute('type', 'checkbox');
    chkDarkLight.setAttribute('id', 'chkDarkLight');
    chkDarkLight.setAttribute('class', 'chkDarkLight');
    const DarkLight = document.createElement('label');
    DarkLight.setAttribute('for', 'chkDarkLight');
    DarkLight.setAttribute('class', 'DarkLight');
    const modeL = document.createElement('span');
    modeL.classList.add('modeL');
    DarkLight.appendChild(modeL);
    const modeN = document.createElement('span');
    modeN.classList.add('modeN');
    DarkLight.appendChild(modeN);
    const modeActive = document.createElement('span');
    modeActive.classList.add('modeActive');

    modeDarkLight.appendChild(chkDarkLight);

    modeDarkLight.appendChild(DarkLight);
    DarkLight.appendChild(modeL);
    DarkLight.appendChild(modeN);
    DarkLight.appendChild(modeActive);

    settings.appendChild(modeDarkLight);

    const settingNote = document.createElement('div');
    settingNote.setAttribute('id', 'settingNote');
    settings.appendChild(settingNote);

    const menuNote = document.createElement('div');
    menuNote.setAttribute('id', 'menuNote');
    settings.appendChild(menuNote);

    const ul = document.createElement('ul');

    const toggleDarkMode = () => {
        const isDark = body.classList.toggle('dark-mode');
        chkDarkLight.checked = isDark;
        liDarkLight.textContent = isDark ? 'Modo escuro ativado' : 'Modo claro ativado';
        liDarkLight.setAttribute('title', isDark ? 'Clique para ativar o modo claro' : 'Clique para ativar o modo escuro');
        localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
    };

    const toggleOfflineMode = () => {
        const isOffline = localStorage.getItem("offlineMode") === "enabled";
        localStorage.setItem("offlineMode", isOffline ? "disabled" : "enabled");
        offlineModeToggle.textContent = isOffline ? 'Modo Offline desativado' : 'Modo Offline ativado';
        offlineModeToggle.setAttribute('title', isOffline ? 'Clique para ativar o modo offline' : 'Clique para desativar o modo offline');
        isOffline ? unregisterServiceWorker() : registerServiceWorker();
    };

    const liDarkLight = document.createElement('li');
    liDarkLight.setAttribute('id', 'liDarkLight');

    if (localStorage.getItem('darkMode') === 'enabled') {
        chkDarkLight.checked = true;
        liDarkLight.textContent = 'Modo escuro ativado';
        liDarkLight.setAttribute('title', 'Clique para ativar o modo claro');
        body.classList.add('dark-mode');
    } else {
        liDarkLight.textContent = 'Modo claro ativado';
        liDarkLight.setAttribute('title', 'Clique para ativar o modo escuro');
    }

    chkDarkLight.addEventListener("change", toggleDarkMode);
    liDarkLight.addEventListener("click", toggleDarkMode);

    const offlineModeToggle = document.createElement('li');
    offlineModeToggle.setAttribute('id', 'offlineModeToggle');

    if (localStorage.getItem("offlineMode") === "enabled") {
        offlineModeToggle.textContent = 'Modo Offline ativado';
        offlineModeToggle.setAttribute('title', 'Clique para desativar o modo offline e voltar a depender da conexão com a internet');
    } else {
        offlineModeToggle.textContent = 'Modo Offline desativado';
        offlineModeToggle.setAttribute('title', 'Clique para ativar o modo offline e acessar o conteúdo sem internet');
    }

    offlineModeToggle.addEventListener('click', toggleOfflineMode);

    const gerenciarNotas = document.createElement('li');
    gerenciarNotas.setAttribute('id', 'gerenciarNotas');
    gerenciarNotas.textContent = 'Gerenciar notas';

    const limparNotas = document.createElement('li');
    limparNotas.setAttribute('id', 'limparNotas');
    limparNotas.textContent = 'Apagar todas as notas';

    const sobrefNotes = document.createElement('li');
    sobrefNotes.setAttribute('id', 'sobrefNotes');
    sobrefNotes.textContent = 'Sobre o fNotes';

    ul.appendChild(liDarkLight);
    ul.appendChild(offlineModeToggle);
    ul.appendChild(gerenciarNotas);
    ul.appendChild(limparNotas);
    ul.appendChild(sobrefNotes);
    menuNote.appendChild(ul);

    header.appendChild(settings);
    fNotes.appendChild(header);

    body.appendChild(fNotes);

    const containerNote = document.createElement('div');
    containerNote.setAttribute('class', 'container-note');
    fNotes.appendChild(containerNote);

    const main = document.createElement('main');
    main.classList.add('content-main');

    const containerN = document.createElement('div');
    containerN.setAttribute('class', 'container-n');
    main.appendChild(containerN);

    const newFNotes = document.createElement('div');
    newFNotes.setAttribute('id', 'new-fNotes');
    containerN.appendChild(newFNotes);

    const newContent = document.createElement('div');
    newContent.setAttribute('id', 'newContent');
    newFNotes.appendChild(newContent);

    const newTitle = document.createElement('div');
    newTitle.setAttribute('id', 'newTitle');
    newTitle.textContent = 'Título';
    newTitle.setAttribute('contenteditable', 'true');
    newTitle.setAttribute('spellcheck', 'false');
    newContent.appendChild(newTitle);

    const newNote = document.createElement('div');
    newNote.setAttribute('id', 'newNote');
    newNote.textContent = 'Criar uma nota...';
    newNote.setAttribute('contenteditable', 'true');
    newNote.setAttribute('spellcheck', 'false');
    newContent.appendChild(newNote);

    const btnNoted = document.createElement('button');
    btnNoted.setAttribute('id', 'btnNoted');
    btnNoted.textContent = 'Criar nota';

    const span = document.createElement('span');
    btnNoted.appendChild(span);
    newFNotes.appendChild(btnNoted);

    const containerL = document.createElement('div');
    containerL.setAttribute('class', 'container-l');
    main.appendChild(containerL);

    const contentNotes = document.createElement('div');
    contentNotes.classList.add('content-notes');
    containerL.appendChild(contentNotes);

    const notification = document.createElement('div');
    notification.classList.add('notification');

    const toastContainer = document.createElement('div');
    toastContainer.classList.add('toast-container');
    notification.appendChild(toastContainer);
    body.appendChild(notification);

    containerNote.appendChild(main);


    const showEmptyNotes = () => {
        const newDiv = document.createElement('div');
        newDiv.setAttribute('id', 'noNotesContainer');

        const iconNote = document.createElement('div');
        iconNote.setAttribute('id', 'noNotesIcon');
        iconNote.style.maskImage = 'url(https://img.icons8.com/pixels/100/create-new.png)';
        newDiv.appendChild(iconNote);

        const textNote = document.createElement('div');
        textNote.setAttribute('id', 'noNotesText');
        textNote.innerHTML = 'Nenhuma nota encontrada!<br>Que tal criar sua primeira anotação?';
        newDiv.appendChild(textNote);

        containerNote.appendChild(newDiv);
    }

    let savedNotes = JSON.parse(localStorage.getItem("savedNotes")) || [];
    let currentNoteIndex = savedNotes.length || 0;

    if (typeof(Storage) !== "undefined") {
        if (savedNotes.length > 0) {
            for (let i = 0; i < savedNotes.length; i++) {
                if (savedNotes[i]) {
                    const newNote = document.createElement('div');
                    newNote.classList.add('note');
                    newNote.setAttribute('slot', i);
                    newNote.classList.add('f' + savedNotes[i][0].title.length);

                    if (savedNotes[i][0].color) {
                        newNote.classList.add(savedNotes[i][0].color);
                    }

                    const noteTitle = document.createElement('div');
                    noteTitle.classList.add('note-title');
                    noteTitle.innerHTML = savedNotes[i][0].title.replace(/\n/g, '<br>');
                    newNote.appendChild(noteTitle);

                    const noteF = document.createElement('div');
                    noteF.classList.add('note-f');
                    noteF.innerHTML = savedNotes[i][0].note.replace(/\n/g, '<br>');
                    newNote.appendChild(noteF);
                    contentNotes.insertBefore(newNote, document.querySelectorAll('.note')[0]);
                }
            }
        } else {
            showEmptyNotes();
        }
    } else {
        const newDiv = document.createElement('div');
        newDiv.setAttribute('id', 'noNotesContainer');

        const iconNote = document.createElement('div');
        iconNote.setAttribute('id', 'noNotesIcon');
        iconNote.style.maskImage = 'url(https://img.icons8.com/pixels/100/error.png)';
        newDiv.appendChild(iconNote);

        const textNote = document.createElement('div');
        textNote.setAttribute('id', 'noNotesText');
        textNote.textContent = 'Infelizmente, seu navegador não suporta Web Storage. Algumas funcionalidades podem não funcionar.';
        newDiv.appendChild(textNote);

        containerNote.appendChild(newDiv);
    }

    const formatDate = () => {
        const date = new Date();

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${day}/${month}/${year} às ${hours}:${minutes}`;
    };

    const showToast = (response) => {
        var toast = document.createElement('div');
        toast.className = 'toast';

        if (response.includes('OK')) {
            toast.classList.add('toast-success');
            toast.innerHTML = '<span class="icon icon-success"></span><p>A nota foi salva com sucesso!</p>';
        } else if (response.includes('okOffline')) {
            toast.classList.add('toast-success');
            toast.innerHTML = '<span class="icon icon-success"></span><p>Modo Offline ativado! O fNotes funcionará sem internet.</p>';
        } else if (response.includes('noData')) {
            toast.classList.add('toast-warning');
            toast.innerHTML = '<span class="icon icon-warning"></span><p>Não há notas para exportar.</p>';
        } else if (response.includes('offline')) {
            toast.classList.add('toast-warning');
            toast.innerHTML = '<span class="icon icon-warning"></span><p>Você está offline!</p>';
        } else {
            toast.classList.add('toast-failed');
            toast.innerHTML = '<span class="icon icon-failed"></span><p>Ocorreu um erro!</p>';
        }

        toastContainer.appendChild(toast);
        toast.style.display = '-webkit-inline-box';
        setTimeout(function() {
            toastContainer.classList.add('fade-out');
            setTimeout(function() {
                toastContainer.removeChild(toast);
            }, 1000);
        }, 3000);
    }

    function pastePlainText(e) {
        e.preventDefault();
        const text = (e.clipboardData || window.clipboardData).getData('text');
        document.execCommand('insertText', false, text);
    }

    searchNotesInput.addEventListener('input', (e) => {
        const search = e.target.value.toLowerCase();

        const filteredNotes = Object.entries(JSON.parse(localStorage.getItem('savedNotes')) || {}).filter(([slot, noteData]) => {

            if (!Array.isArray(noteData) || !noteData[0] || typeof noteData[0] !== 'object') {
                return false;
            }

            const title = noteData[0].title?.toLowerCase() || '';
            const note = noteData[0].note?.toLowerCase() || '';
            return title.includes(search) || note.includes(search);
        });

        const noteContainer = document.querySelector('.content-notes');
        noteContainer.innerHTML = '';

        filteredNotes.forEach(([slot, noteData]) => {
            const noteElement = document.createElement('div');
            noteElement.setAttribute('slot', slot);
            noteElement.classList.add('note');

            if (noteData[0].color) {
                noteElement.classList.add(noteData[0].color);
            }
            noteElement.innerHTML = `
                <div class="note-title">${noteData[0].title || 'Sem título'}</div>
                <div class="note-f">${noteData[0].note || 'Sem conteúdo'}</div>
            `;
            noteContainer.appendChild(noteElement);
        });
    });

    settingNote.addEventListener('click', () => {
        menuNote.classList.toggle('active');
    });

    menuNote.addEventListener('mouseleave', () => menuNote.classList.remove('active'));

    menuNote.addEventListener('click', (e) => {

        const newDiv = document.createElement('div');
        const newDivText = document.createElement('div');
        const newDivTextDialog = document.createElement('div');
        const btnDialog = document.createElement('div');
        const newBtnConfirm = document.createElement('button');
        const btnImport = document.createElement('button');
        const btnExport = document.createElement('button');
        const btnCancel = document.createElement('button');

        newDiv.setAttribute('id', 'dialogNote');
        newDivText.setAttribute('id', 'titleDialog');
        newDivTextDialog.setAttribute('id', 'textDialog');
        btnDialog.setAttribute('id', 'btnDialog');
        newBtnConfirm.setAttribute('id', 'btnConfirm');
        btnImport.setAttribute('id', 'btnImport');
        btnExport.setAttribute('id', 'btnExport');
        btnCancel.setAttribute('id', 'btnCancel');

        newBtnConfirm.innerText = 'Confirmar';
        btnImport.innerText = 'Importar';
        btnExport.innerText = 'Exportar';
        btnCancel.innerText = 'Cancelar';

        const closeDialog = () => {
            newDiv.style.opacity = 0;
            newDiv.style.zIndex = '';

            backdrop.style.opacity = '';
            backdrop.style.zIndex = '';
            body.removeAttribute('style');
            setTimeout(() => {
                newDiv.remove();
            }, 200);
        }

        if (e.target.id == 'gerenciarNotas') {

            backdrop.style.opacity = 1;
            backdrop.style.zIndex = 10;
            newDiv.style.zIndex = 11;
            body.style.overflow = 'hidden';

            newDivText.innerText = 'Gerenciar Dados';
            newDivTextDialog.innerText = 'Escolha uma das opções abaixo para importar ou exportar seus dados. Seus dados serão salvos em formato JSON.';

            const inputFile = document.createElement('input');
            inputFile.setAttribute('id', 'inputFile');
            inputFile.setAttribute('type', 'file');
            inputFile.setAttribute('accept', '.json');
            inputFile.setAttribute('style', 'display: none;');

            btnImport.addEventListener('click', () => {
                inputFile.click();

                inputFile.addEventListener('change', () => {
                    const file = inputFile.files[0];
                    const reader = new FileReader();

                    reader.addEventListener('load', () => {
                        const data = JSON.parse(reader.result);
                        savedNotes = data;
                        localStorage.setItem("savedNotes", JSON.stringify(savedNotes));
                        location.reload();
                    });

                    reader.readAsText(file);
                });
            });

            btnExport.addEventListener('click', () => {
                if (!savedNotes || savedNotes.length === 0) {
                    showToast('noData');
                    return;
                }
                const data = JSON.stringify(savedNotes);
                const blob = new Blob([data], {
                    type: 'application/json'
                });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'notes.json';
                a.click();
                URL.revokeObjectURL(url);
            });

            btnCancel.addEventListener('click', () => closeDialog());

            btnDialog.appendChild(btnImport);
            btnDialog.appendChild(btnExport);
            btnDialog.appendChild(btnCancel);

            newDiv.appendChild(newDivText);
            newDiv.appendChild(newDivTextDialog);
            newDiv.appendChild(inputFile);
            newDiv.appendChild(btnDialog);

            containerNote.appendChild(newDiv);
        }

        if (e.target.id == 'limparNotas') {

            backdrop.style.opacity = 1;
            backdrop.style.zIndex = 10;
            newDiv.style.zIndex = 11;
            body.style.overflow = 'hidden';

            newDivText.innerText = 'Excluir Dados';
            newDivTextDialog.innerText = 'Deseja confirmar a exclusão de seus dados? Não será possível recuperar seus dados.';

            newBtnConfirm.addEventListener('click', () => {
                document.querySelectorAll('.note').forEach((note) => note.remove());
                localStorage.removeItem("savedNotes");

                if (!document.getElementById('noNotesContainer')) {
                    showEmptyNotes();
                }
                closeDialog();
            });

            btnCancel.addEventListener('click', () => closeDialog());

            btnDialog.appendChild(newBtnConfirm);
            btnDialog.appendChild(btnCancel);

            newDiv.appendChild(newDivText);
            newDiv.appendChild(newDivTextDialog);
            newDiv.appendChild(btnDialog);

            containerNote.appendChild(newDiv);
        }

        if (e.target.id == 'sobrefNotes') {

            backdrop.style.opacity = 1;
            backdrop.style.zIndex = 10;
            newDiv.style.zIndex = 11;
            body.style.overflow = 'hidden';

            newDivText.innerText = 'Sobre o fNotes';
            newDivTextDialog.innerHTML = '<p>O <strong>fNotes</strong> é um aplicativo web de anotações simples e eficiente, desenvolvido para facilitar a organização de ideias e tarefas. Ele permite criar, editar e excluir notas diretamente no navegador, utilizando <code>localStorage</code> para armazenamento persistente, sem necessidade de banco de dados externo. Com suporte para modo offline e opções de tema claro e escuro, o fNotes oferece uma experiência personalizada e acessível.</p>';
            newDivTextDialog.innerHTML += '<p><strong>Desenvolvido por:</strong> <a href="https://github.com/FerdiCayet" target="_blank" rel="noopener noreferrer">Fernando Caetano</a></p><p><strong>Repositório no GitHub:</strong> <a href="https://github.com/FerdiCayet/fNotes" target="_blank" rel="noopener noreferrer">fNotes</a></p>';
            newBtnConfirm.innerText = 'Ok';

            newBtnConfirm.addEventListener('click', () => closeDialog());

            btnDialog.appendChild(newBtnConfirm);

            newDiv.appendChild(newDivText);
            newDiv.appendChild(newDivTextDialog);
            newDiv.appendChild(btnDialog);

            containerNote.appendChild(newDiv);
        }

        document.getElementById('menuNote').classList.remove('active');
    });

    document.querySelectorAll('[contenteditable]').forEach(e => e.addEventListener('paste', pastePlainText));

    let isEditing = false;

    newTitle.addEventListener("input", () => isEditing = true);
    newNote.addEventListener("input", () => isEditing = true);

    window.addEventListener("beforeunload", (event) => {
        if (isEditing) {
            event.preventDefault();
            event.returnValue = "Você tem alterações não salvas. Tem certeza de que deseja sair?";
        }
    });

    newTitle.addEventListener('blur', () => {
        if (newTitle.textContent.trim() === '') {
            newTitle.textContent = 'Título';
        }
    });

    newNote.addEventListener('blur', () => {
        if (newNote.textContent.trim() === '') {
            newNote.textContent = 'Criar uma nota...';
        }
    });

    newFNotes.addEventListener('click', (e) => {

        if (!e.target.closest('#new-fNotes').classList.contains('selected')) {
            e.target.closest('#new-fNotes').classList.add('selected');
        }

        if ((e.target.id == 'newTitle' && e.target.textContent === 'Título') || (e.target.id == 'newNote' && e.target.textContent === 'Criar uma nota...')) {
            e.target.textContent = '';
        }

        if (e.target.id === 'btnNoted' || e.target.tagName.toLocaleLowerCase() === 'span') {
            const title = newTitle.innerText.trim();
            const note = newNote.innerText.trim();

            if (!title || title === 'Título' || !note || note === 'Criar uma nota...') {
                return;
            }

            isEditing = false;
            savedNotes[currentNoteIndex] = savedNotes[currentNoteIndex] || [];
            savedNotes[currentNoteIndex].push({ title: title, note: note, formatDate: `Criada em ${formatDate()}` });

            const nNote = document.createElement('div');
            nNote.setAttribute('slot', currentNoteIndex);
            nNote.classList.add('note');
            nNote.classList.add('f' + title.length);

            const nTitle = document.createElement('div');
            nTitle.classList.add('note-title');
            nTitle.innerHTML = savedNotes[currentNoteIndex][0].title.replace(/\n/g, '<br>');
            nNote.appendChild(nTitle);

            const noteF = document.createElement('div');
            noteF.classList.add('note-f');
            noteF.innerHTML = savedNotes[currentNoteIndex][0].note.replace(/\n/g, '<br>');
            nNote.appendChild(noteF);

            console.warn(document.querySelectorAll('.note')[0])

            if (document.getElementById('noNotesContainer')) {
                document.getElementById('noNotesContainer').remove();
            }

            contentNotes.insertBefore(nNote, document.querySelectorAll('.note')[0]);

            newFNotes.classList.remove('selected');
            newTitle.innerText = 'Título';
            newNote.innerText = 'Criar uma nota...';

            localStorage.setItem("savedNotes", JSON.stringify(savedNotes));
            currentNoteIndex++;
        }
    });

    containerNote.addEventListener('click', (e) => {

        if (e.target.classList.contains('note') || e.target.parentElement.classList.contains('note')) {

            const noteElement = e.target.closest('.note');

            noteElement.classList.add('selected');

            if (!savedNotes[noteElement.slot]) {
                return;
            }

            const viewNote = document.createElement('div');
            viewNote.setAttribute('id', 'viewNote');

            if (savedNotes[noteElement.slot][0].color) {
                viewNote.classList.add(savedNotes[noteElement.slot][0].color);
            } else {
                // if(body.classList.contains('dark-mode')){
                //     viewNote.style.backgroundColor = '#252f2a';
                // }else{
                //     viewNote.style.backgroundColor = '#d4d4d4';
                // }
            }

            const closeNote = document.createElement('div');
            closeNote.setAttribute('class', 'closeNote');

            closeNote.addEventListener('click', () => {
                noteElement.classList.remove('selected');
                viewNote.remove();
                backdrop.style.zIndex = '';
                backdrop.style.opacity = '';
                body.removeAttribute('style');
            });

            const viewContent = document.createElement('div');
            viewContent.setAttribute('class', 'viewContent');

            const viewTitle = document.createElement('div');
            viewTitle.setAttribute('id', 'viewTitle');
            viewTitle.setAttribute('contenteditable', 'true');
            viewTitle.setAttribute('spellcheck', 'false');
            viewTitle.innerHTML = savedNotes[noteElement.slot][0].title.replace(/\n/g, '<br>');

            viewTitle.addEventListener('input', () => {
                savedNotes[noteElement.slot][0].title = viewTitle.innerText;
                savedNotes[noteElement.slot][0].editedDate = `Editada em ${formatDate()}`;
                document.querySelector('.note[slot="' + noteElement.slot + '"] > .note-title').innerHTML = viewTitle.innerText.replace(/\n/g, '<br>');
                localStorage.setItem('savedNotes', JSON.stringify(savedNotes));
            });

            const viewNoteText = document.createElement('div');
            viewNoteText.setAttribute('id', 'viewNoteText');
            viewNoteText.setAttribute('contenteditable', 'true');
            viewNoteText.setAttribute('spellcheck', 'false');
            viewNoteText.innerHTML = savedNotes[noteElement.slot][0].note.replace(/\n/g, '<br>');

            viewNoteText.addEventListener('input', () => {
                savedNotes[noteElement.slot][0].note = viewNoteText.innerText;
                savedNotes[noteElement.slot][0].editedDate = `Editada em ${formatDate()}`;
                document.querySelector('.note[slot="' + noteElement.slot + '"] > .note-f').innerHTML = viewNoteText.innerText.replace(/\n/g, '<br>');
                localStorage.setItem('savedNotes', JSON.stringify(savedNotes));
            });

            document.querySelectorAll('[contenteditable]').forEach(e => e.addEventListener('paste', pastePlainText));

            viewContent.appendChild(viewTitle);
            viewContent.appendChild(viewNoteText);

            const viewDate = document.createElement('div');
            viewDate.setAttribute('class', 'viewDate');
            viewDate.setAttribute('title', `Criada em ${savedNotes[noteElement.slot][0].formatDate}`);
            if (!savedNotes[noteElement.slot][0].editedDate) {
                viewDate.textContent = savedNotes[noteElement.slot][0].formatDate;
            } else {
                viewDate.textContent = savedNotes[noteElement.slot][0].editedDate;
            }

            const settingsNote = document.createElement('div');
            settingsNote.setAttribute('class', 'settings-note');

            const themeColor = document.createElement('div');
            themeColor.setAttribute('class', 'theme-color');

            const colorSelect = document.createElement('div');
            colorSelect.setAttribute('class', 'colorSelect');

            for (let i = 1; i <= 10; i++) {
                const color = document.createElement('div');
                color.setAttribute('class', `color f-${i}`);
                colorSelect.appendChild(color);
            }

            colorSelect.querySelectorAll('.color').forEach(color => {
                color.addEventListener('click', () => {
                    savedNotes[noteElement.slot][0].color = color.classList[1];
                    localStorage.setItem('savedNotes', JSON.stringify(savedNotes));
                    document.querySelector('.note[slot="' + noteElement.slot + '"]').className = 'note ' + color.classList[1];
                    viewNote.className = color.classList[1];
                });
            });

            themeColor.addEventListener('click', () => {
                // if (colorSelect.classList.contains('active')) {
                //     colorSelect.classList.remove('active');
                //     colorSelect.style.display = 'none';
                // } else {
                //     colorSelect.classList.add('active');
                //     colorSelect.style.display = 'flex';
                // }
                colorSelect.classList.toggle('active');
            });

            const colorOther = document.createElement('div');
            colorOther.setAttribute('class', 'color-other');

            const colorOtherText = document.createElement('div');
            colorOtherText.setAttribute('class', 'color-other-text');

            const label = document.createElement('label');
            label.setAttribute('for', 'colorOther');
            label.textContent = 'Deseja de um cor diferente?';

            const input = document.createElement('input');
            input.setAttribute('type', 'text');
            input.setAttribute('id', 'colorOther');
            input.setAttribute('placeholder', 'Ex.: #000000');

            const button = document.createElement('button');
            button.setAttribute('id', 'btnColorOther');
            button.textContent = 'Salvar';

            colorOtherText.appendChild(label);
            colorOtherText.appendChild(input);
            colorOtherText.appendChild(button);
            colorOther.appendChild(colorOtherText);

            colorSelect.appendChild(colorOther);
            //themeColor.appendChild(colorSelect);
            settingsNote.appendChild(themeColor);
            settingsNote.appendChild(colorSelect);

            const editNote = document.createElement('div');
            editNote.setAttribute('class', 'edit-note');
            settingsNote.appendChild(editNote);

            const deleteNote = document.createElement('div');
            deleteNote.setAttribute('class', 'delete-note');
            settingsNote.appendChild(deleteNote);

            deleteNote.addEventListener('click', () => {
                delete savedNotes[noteElement.slot];
                localStorage.setItem('savedNotes', JSON.stringify(savedNotes));
                document.querySelector('.note[slot="' + noteElement.slot + '"]').remove();
                viewNote.remove();
                backdrop.style.opacity = '';
                backdrop.style.zIndex = '';
                body.removeAttribute('style');

                if (document.querySelectorAll('.note').length === 0) {
                    showEmptyNotes();
                }
            });

            viewNote.appendChild(closeNote);
            viewNote.appendChild(viewContent);
            viewNote.appendChild(viewDate);
            viewNote.appendChild(settingsNote);

            backdrop.style.zIndex = 10;
            backdrop.style.opacity = 1;
            body.style.overflow = 'hidden';

            fNotes.appendChild(viewNote);
        }
    });

    function registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(() => showToast('okOffline'))
                .catch(err => console.log("Erro ao registrar Service Worker", err));
        }
    }

    function unregisterServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations().then((registrations) => {
                registrations.forEach((registration) => {
                    registration.unregister();
                    console.log("Modo Offline desativado!");
                });
            });
        }
    }
});