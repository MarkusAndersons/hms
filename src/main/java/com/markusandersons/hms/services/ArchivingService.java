/*
 * Copyright 2018 Markus Andersons
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.markusandersons.hms.services;

import com.markusandersons.hms.models.ArchiveEvent;
import com.markusandersons.hms.repositories.ArchivingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.time.LocalDateTime;
import java.time.ZoneId;

@Service
public class ArchivingService {
    private final ArchivingRepository archivingRepository;
    private final SettingsService settingsService;

    @Autowired
    public ArchivingService(ArchivingRepository archivingRepository, SettingsService settingsService) {
        this.archivingRepository = archivingRepository;
        this.settingsService = settingsService;
    }

    public void archiveEvent(
        @Nullable String requestPath,
        @Nullable String requestHttpMethod,
        @Nullable String storedData,
        @Nullable Principal principal
    ) {
        if (!settingsService.getServerSettings().getArchiveAllEvents()) return;
        final String username = principal != null ? principal.getName() : null;
        final ArchiveEvent archiveEvent = new ArchiveEvent(requestPath, requestHttpMethod, LocalDateTime.now(ZoneId.of("UTC")), storedData, username);
        archivingRepository.save(archiveEvent);
    }

    public Iterable<ArchiveEvent> getArchiveEvents() {
        return archivingRepository.findAllByOrderByEventTimeDesc();
    }
}
